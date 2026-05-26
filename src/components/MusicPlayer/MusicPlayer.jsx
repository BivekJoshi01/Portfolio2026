import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  Disc3,
  Heart,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { TRACKS } from "./tracks";
import { useAudioEngine } from "./useAudioEngine";
import { useFavorites } from "./useFavorites";
import Visualizer from "./Visualizer";

const fmt = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const REPEAT_MODES = ["off", "all", "one"];

const MusicPlayer = () => {
  const { t } = useTranslation();
  const seekTrackRef = useRef(null);
  const favorites = useFavorites();
  const [filter, setFilter] = useState("all"); // "all" | "favorites"
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // off | all | one
  const [hoverPct, setHoverPct] = useState(null);

  // Refs to keep state stable inside engine's onEnded callback
  const stateRef = useRef({ shuffle, repeat });
  useEffect(() => {
    stateRef.current = { shuffle, repeat };
  }, [shuffle, repeat]);

  // We need playTrack/stop accessible inside the onEnded callback
  // so we use a ref pattern
  const handleEnded = useCallback((endedTrack) => {
    const { shuffle: sh, repeat: rp } = stateRef.current;
    const idx = TRACKS.findIndex((tr) => tr.id === endedTrack.id);

    if (rp === "one") {
      // restart same track
      enginePlayTrackRef.current?.(endedTrack);
      return;
    }

    let nextIdx;
    if (sh) {
      // pick a random different track when possible
      if (TRACKS.length === 1) nextIdx = 0;
      else {
        do {
          nextIdx = Math.floor(Math.random() * TRACKS.length);
        } while (nextIdx === idx);
      }
    } else {
      nextIdx = idx + 1;
    }

    if (nextIdx >= TRACKS.length) {
      if (rp === "all") nextIdx = 0;
      else {
        engineStopRef.current?.();
        return;
      }
    }
    enginePlayTrackRef.current?.(TRACKS[nextIdx]);
  }, []);

  const {
    activeTrackId,
    isPlaying,
    elapsed,
    duration: liveDuration,
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
  } = useAudioEngine({ onEnded: handleEnded });

  // Wire refs after engine is created
  const enginePlayTrackRef = useRef(playTrack);
  const engineStopRef = useRef(stop);
  useEffect(() => {
    enginePlayTrackRef.current = playTrack;
    engineStopRef.current = stop;
  }, [playTrack, stop]);

  const visibleTracks = useMemo(() => {
    if (filter === "favorites") return TRACKS.filter((tr) => favorites.has(tr.id));
    return TRACKS;
  }, [filter, favorites]);

  const activeTrack = useMemo(
    () => TRACKS.find((tr) => tr.id === activeTrackId) || TRACKS[0],
    [activeTrackId]
  );
  const activeIndex = TRACKS.findIndex((tr) => tr.id === activeTrack.id);
  const effectiveDuration =
    activeTrackId && liveDuration ? liveDuration : activeTrack.duration || 0;
  const progress = effectiveDuration ? Math.min(1, elapsed / effectiveDuration) : 0;
  const isFav = favorites.has(activeTrack.id);

  const handlePrimary = () => {
    if (!activeTrackId) {
      playTrack(activeTrack);
    } else if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const next = () => {
    if (shuffle && TRACKS.length > 1) {
      let n;
      do {
        n = Math.floor(Math.random() * TRACKS.length);
      } while (n === activeIndex);
      playTrack(TRACKS[n]);
    } else {
      const i = (activeIndex + 1) % TRACKS.length;
      playTrack(TRACKS[i]);
    }
  };
  const prev = () => {
    const i = (activeIndex - 1 + TRACKS.length) % TRACKS.length;
    playTrack(TRACKS[i]);
  };

  const cycleRepeat = () => {
    setRepeat((r) => REPEAT_MODES[(REPEAT_MODES.indexOf(r) + 1) % REPEAT_MODES.length]);
  };

  const onSeekClick = (e) => {
    const el = seekTrackRef.current;
    if (!el || !activeTrackId || !effectiveDuration) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(ratio * effectiveDuration);
  };

  const onSeekHover = (e) => {
    const el = seekTrackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPct(ratio);
  };

  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12"
      aria-label={t("music_section_label")}
    >
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {t("music_title_listen")}{" "}
            <span className="bg-(--secondary) bg-clip-text text-transparent">
              {t("music_title_while")}
            </span>
          </h2>
          <p className="opacity-70 mt-2 text-base sm:text-lg max-w-xl">
            {t("music_subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
          <Music2 size={14} />
          <span>{t("music_engine_label")}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ type: "spring", stiffness: 110, damping: 18 }}
        className="relative grid lg:grid-cols-[minmax(0,1fr)_360px] gap-4 rounded-3xl overflow-hidden border backdrop-blur-md p-3 sm:p-5"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(20,20,28,0.6)",
        }}
      >
        {/* Animated mesh background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={activeTrack.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 0.55 : 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                background: activeTrack.gradient,
                filter: "blur(80px)",
                transform: "scale(1.2)",
              }}
            />
          </AnimatePresence>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`blob-${activeTrack.id}-${i}`}
              className="absolute rounded-full"
              style={{
                width: 240 + i * 60,
                height: 240 + i * 60,
                background: activeTrack.gradient,
                filter: "blur(60px)",
                opacity: 0.18,
                top: `${20 + i * 25}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{
                x: [0, 40, -30, 0],
                y: [0, -30, 20, 0],
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Now playing column */}
        <div className="relative flex flex-col gap-4 z-10">
          <div className="flex gap-4 items-center">
            {/* Vinyl cover */}
            <div className="relative shrink-0">
              <motion.div
                className="rounded-full shadow-2xl relative overflow-hidden"
                style={{
                  width: 156,
                  height: 156,
                  background: activeTrack.gradient,
                }}
                animate={{
                  rotate: isPlaying ? 360 : 0,
                  scale: isPlaying ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  rotate: {
                    duration: 14,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear",
                  },
                  scale: {
                    duration: 3,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Concentric grooves */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "repeating-radial-gradient(circle, rgba(0,0,0,0.18) 0 1.2px, transparent 1.2px 5px)",
                  }}
                />
                {/* Inner label */}
                <div
                  className="absolute inset-0 m-auto rounded-full flex items-center justify-center shadow-inner"
                  style={{
                    width: 60,
                    height: 60,
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(0,0,0,0.6))",
                  }}
                >
                  <div
                    className="rounded-full bg-black flex items-center justify-center"
                    style={{ width: 42, height: 42 }}
                  >
                    <Disc3 size={16} className="text-white/70" />
                  </div>
                </div>
                {/* Reflection */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.25) 100%)",
                  }}
                />
              </motion.div>
              {/* Tone arm hint */}
              <motion.div
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                style={{ background: activeTrack.accent }}
                animate={{
                  scale: isPlaying ? [1, 1.4, 1] : 1,
                  opacity: isPlaying ? [0.6, 1, 0.6] : 0.4,
                }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrack.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="text-[11px] uppercase tracking-wider opacity-60 flex items-center gap-2">
                    {isPlaying ? (
                      <>
                        <span className="flex items-end gap-0.5 h-3" aria-hidden>
                          {[0, 1, 2].map((b) => (
                            <motion.span
                              key={b}
                              className="w-[2.5px] rounded-full"
                              style={{ background: activeTrack.accent }}
                              animate={{ height: ["20%", "100%", "40%"] }}
                              transition={{
                                duration: 0.7 + b * 0.18,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: b * 0.08,
                              }}
                            />
                          ))}
                        </span>
                        {t("music_now_playing")}
                      </>
                    ) : (
                      t("music_paused")
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold mt-1 truncate">
                    {activeTrack.title}
                  </div>
                  <div className="text-sm opacity-70 truncate">
                    {activeTrack.artist} · {activeTrack.mood}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Favorite + share */}
              <div className="mt-3 flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => favorites.toggle(activeTrack.id)}
                  whileTap={{ scale: 0.86 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-colors"
                  style={{
                    borderColor: isFav
                      ? activeTrack.accent
                      : "rgba(255,255,255,0.18)",
                    background: isFav
                      ? `${activeTrack.accent}22`
                      : "transparent",
                    color: isFav ? activeTrack.accent : "inherit",
                  }}
                  aria-label={isFav ? t("music_unfavorite") : t("music_favorite")}
                  aria-pressed={isFav}
                >
                  <motion.span
                    animate={isFav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Heart
                      size={13}
                      fill={isFav ? activeTrack.accent : "transparent"}
                      strokeWidth={2}
                    />
                  </motion.span>
                  <span>
                    {isFav ? t("music_favorited") : t("music_favorite")}
                  </span>
                </motion.button>
                <span className="text-[11px] opacity-50 inline-flex items-center gap-1">
                  <Sparkles size={11} />
                  {t("music_save_favorite_hint")}
                </span>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div
            className="rounded-xl overflow-hidden border h-20 sm:h-24"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <Visualizer
              analyserRef={analyserRef}
              isPlaying={isPlaying}
              accent={activeTrack.accent}
            />
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 text-xs">
            <span className="tabular-nums opacity-70 w-10 text-right">
              {fmt(elapsed)}
            </span>
            <button
              type="button"
              ref={seekTrackRef}
              onClick={onSeekClick}
              onMouseMove={onSeekHover}
              onMouseLeave={() => setHoverPct(null)}
              aria-label={t("music_seek")}
              className="relative flex-1 h-2 rounded-full bg-white/10 overflow-visible cursor-pointer group"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                style={{ width: `${progress * 100}%` }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: activeTrack.gradient,
                    transition: isPlaying ? "all 100ms linear" : "all 200ms",
                  }}
                />
              </div>
              {/* Hover preview */}
              {hoverPct != null && activeTrackId && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] tabular-nums pointer-events-none"
                  style={{ left: `${hoverPct * 100}%` }}
                >
                  {fmt(hoverPct * effectiveDuration)}
                </div>
              )}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow ring-2"
                style={{
                  left: `calc(${progress * 100}% - 7px)`,
                  opacity: activeTrackId ? 1 : 0,
                  ringColor: activeTrack.accent,
                  transition: isPlaying ? "left 100ms linear" : "left 200ms",
                }}
                animate={{
                  scale: isPlaying ? [1, 1.15, 1] : 1,
                }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </button>
            <span className="tabular-nums opacity-70 w-10">
              {fmt(effectiveDuration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShuffle((s) => !s)}
              aria-label={shuffle ? t("music_shuffle_on") : t("music_shuffle_off")}
              aria-pressed={shuffle}
              title={shuffle ? t("music_shuffle_on") : t("music_shuffle_off")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: shuffle ? activeTrack.accent : "inherit" }}
            >
              <Shuffle size={16} />
            </button>

            <button
              type="button"
              onClick={prev}
              aria-label={t("music_prev")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <motion.button
              type="button"
              onClick={handlePrimary}
              aria-label={isPlaying ? t("music_pause") : t("music_play")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative h-14 w-14 rounded-full flex items-center justify-center text-white shadow-xl"
              style={{ background: activeTrack.gradient }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: activeTrack.gradient, opacity: 0.6 }}
                animate={{
                  scale: isPlaying ? [1, 1.4, 1] : 1,
                  opacity: isPlaying ? [0.45, 0, 0.45] : 0,
                }}
                transition={{
                  duration: 1.8,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeOut",
                }}
              />
              <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                  <motion.span
                    key="pause"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                  >
                    <Pause size={22} fill="currentColor" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="play"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                    style={{ marginLeft: 2 }}
                  >
                    <Play size={22} fill="currentColor" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={next}
              aria-label={t("music_next")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <SkipForward size={20} />
            </button>

            <button
              type="button"
              onClick={cycleRepeat}
              aria-label={t(`music_repeat_${repeat}`)}
              title={t(`music_repeat_${repeat}`)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: repeat !== "off" ? activeTrack.accent : "inherit" }}
            >
              {repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
            </button>

            <div className="hidden sm:flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? t("music_unmute") : t("music_mute")}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 accent-(--primary)"
                aria-label={t("music_volume")}
              />
            </div>
          </div>
        </div>

        {/* Playlist column */}
        <div className="relative z-10">
          {/* Filter tabs */}
          <div
            className="relative flex items-center gap-1 mb-3 p-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {[
              { id: "all", label: t("music_filter_all"), icon: ListMusic, count: TRACKS.length },
              {
                id: "favorites",
                label: t("music_filter_favorites"),
                icon: Heart,
                count: favorites.count,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className="relative flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors z-10"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="music-filter-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: activeTrack.accent }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon
                      size={12}
                      fill={tab.id === "favorites" && favorites.count > 0 ? "currentColor" : "transparent"}
                    />
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-70">{tab.count}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <ul className="flex flex-col gap-1 max-h-85 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {visibleTracks.map((tr, i) => {
                const isActive = tr.id === activeTrack.id;
                const fav = favorites.has(tr.id);
                return (
                  <motion.li
                    key={tr.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.28,
                      delay: i * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className={`group relative w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-(--nav-text,#fff)"
                      }`}
                      onClick={() => playTrack(tr)}
                    >
                      <motion.div
                        className="w-10 h-10 shrink-0 rounded-lg shadow-md relative overflow-hidden"
                        style={{ background: tr.gradient }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isActive && isPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Disc3 size={18} className="text-white/90 animate-spin" />
                          </div>
                        )}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate">
                          {tr.title}
                        </div>
                        <div className="text-[11px] opacity-60 truncate">
                          {tr.mood}
                        </div>
                      </div>
                      <div className="text-[11px] tabular-nums opacity-70 shrink-0">
                        {fmt(tr.duration)}
                      </div>
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          favorites.toggle(tr.id);
                        }}
                        whileTap={{ scale: 0.84 }}
                        whileHover={{ scale: 1.15 }}
                        aria-label={fav ? t("music_unfavorite") : t("music_favorite")}
                        aria-pressed={fav}
                        className={`shrink-0 p-1 rounded-full transition-opacity ${
                          fav || isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"
                        }`}
                        style={{ color: fav ? tr.accent : "currentColor" }}
                      >
                        <Heart
                          size={14}
                          fill={fav ? tr.accent : "transparent"}
                          strokeWidth={2}
                        />
                      </motion.button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
            {visibleTracks.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-8 text-center text-sm opacity-60"
              >
                <Heart size={20} className="mx-auto mb-2 opacity-50" />
                {t("music_no_favorites")}
              </motion.li>
            )}
          </ul>
        </div>
      </motion.div>

      <p className="text-center text-xs opacity-50 mt-4">
        {t("music_footer_note")}
      </p>
    </section>
  );
};

export default MusicPlayer;
