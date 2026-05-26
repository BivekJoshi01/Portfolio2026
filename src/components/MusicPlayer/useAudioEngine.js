import { useCallback, useEffect, useRef, useState } from "react";

// Schedule one chord across the master bus with attack/release envelope.
const scheduleChord = (ctx, master, chord, when, secs, waveform, bass) => {
  chord.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, when);
    osc.detune.setValueAtTime((i - 1) * 4, when);

    const peak = waveform === "sawtooth" || waveform === "square" ? 0.06 : 0.12;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(peak, when + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + secs);

    osc.connect(gain).connect(master);
    osc.start(when);
    osc.stop(when + secs + 0.05);
  });

  if (bass) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(chord[0] / 2, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.18, when + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + secs);
    osc.connect(gain).connect(master);
    osc.start(when);
    osc.stop(when + secs + 0.05);
  }
};

export const useAudioEngine = ({ onEnded } = {}) => {
  // Web Audio context + master/analyser (shared between procedural & file modes)
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const analyserRef = useRef(null);

  // Active track + mode
  const trackRef = useRef(null);
  const modeRef = useRef(null); // "procedural" | "file"

  // Procedural scheduler refs
  const chordIdxRef = useRef(0);
  const nextChordTimeRef = useRef(0);
  const startedAtRef = useRef(0);
  const elapsedAtPauseRef = useRef(0);
  const schedulerTimerRef = useRef(null);
  const isActiveRef = useRef(false);

  // File playback refs
  const audioElRef = useRef(null); // HTMLAudioElement
  const mediaSourceMapRef = useRef(new Map()); // src -> MediaElementAudioSourceNode
  const fileEndedHandlerRef = useRef(null);

  const onEndedRef = useRef(onEnded);
  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.78;
    master.gain.value = muted ? 0 : volume;
    master.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    analyserRef.current = analyser;
    return ctx;
  }, [muted, volume]);

  // ---------- Procedural ----------
  const stopScheduler = useCallback(() => {
    isActiveRef.current = false;
    if (schedulerTimerRef.current) {
      clearTimeout(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
  }, []);

  const proceduralTick = useCallback(() => {
    if (!isActiveRef.current) return;
    const ctx = ctxRef.current;
    const track = trackRef.current;
    if (!ctx || !track || !track.chords) return;

    const horizon = ctx.currentTime + 0.4;
    while (nextChordTimeRef.current < horizon) {
      const chord = track.chords[chordIdxRef.current % track.chords.length];
      scheduleChord(
        ctx,
        masterRef.current,
        chord,
        nextChordTimeRef.current,
        track.chordSecs,
        track.waveform,
        track.bass
      );
      nextChordTimeRef.current += track.chordSecs;
      chordIdxRef.current += 1;
    }
    schedulerTimerRef.current = setTimeout(proceduralTick, 80);
  }, []);

  const startProcedural = useCallback(
    (track, fromSeconds = 0) => {
      const ctx = ensureContext();
      if (ctx.state === "suspended") ctx.resume();

      stopScheduler();
      trackRef.current = track;
      modeRef.current = "procedural";
      chordIdxRef.current = Math.floor(fromSeconds / track.chordSecs);
      nextChordTimeRef.current = ctx.currentTime + 0.05;
      startedAtRef.current = ctx.currentTime - fromSeconds;
      elapsedAtPauseRef.current = fromSeconds;
      isActiveRef.current = true;
      setDuration(track.duration || 90);
      proceduralTick();
    },
    [ensureContext, stopScheduler, proceduralTick]
  );

  // ---------- File ----------
  const ensureAudioElement = useCallback(() => {
    if (audioElRef.current) return audioElRef.current;
    const el = new Audio();
    el.crossOrigin = "anonymous";
    el.preload = "auto";
    audioElRef.current = el;
    return el;
  }, []);

  const detachFileEndedHandler = useCallback(() => {
    const el = audioElRef.current;
    if (!el || !fileEndedHandlerRef.current) return;
    el.removeEventListener("ended", fileEndedHandlerRef.current);
    fileEndedHandlerRef.current = null;
  }, []);

  const stopFile = useCallback(() => {
    const el = audioElRef.current;
    if (el) {
      try {
        el.pause();
      } catch {
        // ignore
      }
    }
    detachFileEndedHandler();
  }, [detachFileEndedHandler]);

  const startFile = useCallback(
    (track, fromSeconds = 0) => {
      const ctx = ensureContext();
      if (ctx.state === "suspended") ctx.resume();

      stopScheduler();
      stopFile();

      const el = ensureAudioElement();

      // Hook up MediaElementSource once per src so the analyser sees output
      let node = mediaSourceMapRef.current.get(track.src);
      if (!node) {
        try {
          node = ctx.createMediaElementSource(el);
          node.connect(masterRef.current);
          mediaSourceMapRef.current.set(track.src, node);
        } catch {
          // If element is reused with a different src, we still need to connect.
          // Some browsers throw "already connected"; safe to ignore.
        }
      }

      // Swap src if needed
      if (el.src !== track.src) {
        // Resolve relative URLs through bundler-supplied absolute URL when present
        el.src = track.src;
      }

      trackRef.current = track;
      modeRef.current = "file";
      elapsedAtPauseRef.current = fromSeconds;
      setElapsed(fromSeconds);

      const handleLoadedMeta = () => {
        if (isFinite(el.duration)) setDuration(el.duration);
      };
      el.addEventListener("loadedmetadata", handleLoadedMeta, { once: true });

      const handleEnded = () => {
        const cb = onEndedRef.current;
        if (typeof cb === "function") {
          cb(track);
        } else {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      };
      fileEndedHandlerRef.current = handleEnded;
      el.addEventListener("ended", handleEnded);

      const startPlayback = () => {
        try {
          el.currentTime = fromSeconds;
        } catch {
          // ignore (some browsers throw before duration is known)
        }
        el.play().catch(() => {
          // Auto-play blocked or load issue — caller will see isPlaying=false soon.
        });
      };

      if (el.readyState >= 1 /* HAVE_METADATA */) {
        startPlayback();
        if (isFinite(el.duration)) setDuration(el.duration);
      } else {
        const onCanPlay = () => {
          el.removeEventListener("canplay", onCanPlay);
          startPlayback();
        };
        el.addEventListener("canplay", onCanPlay);
      }
    },
    [ensureContext, ensureAudioElement, stopScheduler, stopFile]
  );

  // ---------- Public API ----------
  const playTrack = useCallback(
    (track) => {
      setActiveTrackId(track.id);
      setIsPlaying(true);
      if (track.src) startFile(track, 0);
      else startProcedural(track, 0);
    },
    [startFile, startProcedural]
  );

  const pause = useCallback(() => {
    if (!isPlaying) return;
    if (modeRef.current === "file") {
      const el = audioElRef.current;
      if (el) {
        elapsedAtPauseRef.current = el.currentTime;
        try {
          el.pause();
        } catch {
          // ignore
        }
      }
    } else {
      const ctx = ctxRef.current;
      if (ctx) {
        elapsedAtPauseRef.current = ctx.currentTime - startedAtRef.current;
      }
      stopScheduler();
    }
    setIsPlaying(false);
  }, [isPlaying, stopScheduler]);

  const resume = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setIsPlaying(true);
    if (modeRef.current === "file") {
      const el = audioElRef.current;
      if (!el) {
        startFile(track, elapsedAtPauseRef.current);
        return;
      }
      try {
        el.currentTime = elapsedAtPauseRef.current;
      } catch {
        // ignore
      }
      el.play().catch(() => setIsPlaying(false));
    } else {
      startProcedural(track, elapsedAtPauseRef.current);
    }
  }, [startFile, startProcedural]);

  const seek = useCallback(
    (seconds) => {
      const track = trackRef.current;
      if (!track) return;
      const total =
        modeRef.current === "file"
          ? audioElRef.current?.duration || track.duration || 0
          : track.duration;
      const clamped = Math.max(0, Math.min(seconds, total));
      elapsedAtPauseRef.current = clamped;
      setElapsed(clamped);

      if (modeRef.current === "file") {
        const el = audioElRef.current;
        if (el) {
          try {
            el.currentTime = clamped;
          } catch {
            // ignore
          }
        }
      } else if (isPlaying) {
        startProcedural(track, clamped);
      }
    },
    [isPlaying, startProcedural]
  );

  const setVolume = useCallback(
    (v) => {
      const next = Math.max(0, Math.min(1, v));
      setVolumeState(next);
      if (masterRef.current && !muted) {
        masterRef.current.gain.linearRampToValueAtTime(
          next,
          (ctxRef.current?.currentTime || 0) + 0.05
        );
      }
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (masterRef.current) {
        masterRef.current.gain.linearRampToValueAtTime(
          next ? 0 : volume,
          (ctxRef.current?.currentTime || 0) + 0.05
        );
      }
      return next;
    });
  }, [volume]);

  const stop = useCallback(() => {
    stopScheduler();
    stopFile();
    elapsedAtPauseRef.current = 0;
    setElapsed(0);
    setIsPlaying(false);
  }, [stopScheduler, stopFile]);

  // ---------- Elapsed ticker ----------
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      if (modeRef.current === "file") {
        const el = audioElRef.current;
        if (!el) return;
        setElapsed(el.currentTime);
        if (isFinite(el.duration)) setDuration(el.duration);
      } else {
        const ctx = ctxRef.current;
        const track = trackRef.current;
        if (!ctx || !track) return;
        const e = ctx.currentTime - startedAtRef.current;
        if (e >= track.duration) {
          const cb = onEndedRef.current;
          if (typeof cb === "function") {
            cb(track);
          } else {
            startProcedural(track, 0);
            setElapsed(0);
          }
        } else {
          setElapsed(e);
        }
      }
    }, 100);
    return () => clearInterval(id);
  }, [isPlaying, startProcedural]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopScheduler();
      stopFile();
      const el = audioElRef.current;
      if (el) {
        el.src = "";
      }
      const ctx = ctxRef.current;
      if (ctx && ctx.state !== "closed") {
        try {
          ctx.close();
        } catch {
          // ignore
        }
      }
    };
  }, [stopScheduler, stopFile]);

  return {
    activeTrackId,
    isPlaying,
    elapsed,
    duration,
    volume,
    muted,
    analyserRef,
    playTrack,
    pause,
    resume,
    stop,
    seek,
    setVolume,
    toggleMute,
  };
};
