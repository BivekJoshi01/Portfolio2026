import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Radio,
  Mail,
  User,
  MessageSquareText,
  Tag,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const CONTACT_EMAIL = "bvekjoshi03@gmail.com";
const MESSAGE_LIMIT = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const FIELDS = [
  { key: "name", label: "Name", icon: User, placeholder: "Your name", required: true, autoComplete: "name" },
  { key: "email", label: "Email", icon: Mail, placeholder: "you@example.com", type: "email", required: true, autoComplete: "email" },
  { key: "subject", label: "Subject", icon: Tag, placeholder: "Project, role, or just hello" },
];

const CHANNELS = [
  { label: "GitHub", href: "https://github.com/BivekJoshi01", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/bivekjoshi", icon: FaLinkedin },
];

const ContactCard = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // Signal strength = how complete the message is
  const signal = useMemo(() => {
    const checks = [
      form.name.trim().length > 1,
      EMAIL_RE.test(form.email.trim()),
      form.subject.trim().length > 1,
      form.message.trim().length > 9,
    ];
    return 20 + checks.filter(Boolean).length * 20;
  }, [form]);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    const subject = form.subject.trim() || `Hello from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`;

    setStatus("sending");
    // Opens the visitor's mail app with everything pre-filled
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setStatus("sent");
      // Keep the text so nothing is lost if no mail app opened
      setTimeout(() => setStatus("idle"), 2800);
    }, 900);
  };

  return (
    <div className="relative w-full h-full">
      {/* HUD corner brackets */}
      <CornerBrackets />

      <div
        className="relative h-full rounded-2xl backdrop-blur-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--card) 75%, transparent), color-mix(in srgb, var(--bg) 60%, transparent))",
          border: "1px solid var(--card-border)",
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent) inset, 0 20px 60px -20px color-mix(in srgb, var(--primary) 50%, transparent)",
        }}
      >
        {/* Scanline shimmer */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 90%, transparent), transparent)",
            filter: "blur(1px)",
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(circle at 30% 30%, black 0%, transparent 80%)",
          }}
        />

        {/* Terminal header */}
        <div
          className="relative flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <Dot color="#ef4444" />
              <Dot color="#f59e0b" />
              <Dot color="#22c55e" pulse />
            </span>
            <span className="text-[10px] tracking-[0.3em] font-mono opacity-70 ml-2">
              CONTACT.exe
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono opacity-70">
            <Radio size={11} className="animate-pulse" />
            <span>ONLINE · LALITPUR 27.67°N</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative p-5 sm:p-7 space-y-5">
          {/* Heading */}
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Open a <span style={{ color: "var(--primary)" }}>channel</span>
              <span
                aria-hidden
                className="ml-1 inline-block w-[10px] h-[22px] align-[-2px] animate-pulse"
                style={{ background: "var(--primary)" }}
              />
            </h3>
            <p className="text-sm opacity-70">
              I usually reply within a day. Freelance, full-time, or just a
              chat — all welcome.
            </p>
          </div>

          {/* Row inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELDS.slice(0, 2).map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={form[f.key]}
                onChange={handle(f.key)}
                focused={focused === f.key}
                setFocused={setFocused}
              />
            ))}
          </div>

          <FieldInput
            field={FIELDS[2]}
            value={form.subject}
            onChange={handle("subject")}
            focused={focused === "subject"}
            setFocused={setFocused}
          />

          {/* Message */}
          <div>
            <FieldLabel htmlFor="contact-message" icon={MessageSquareText} label="Message" required />
            <FieldShell focused={focused === "message"}>
              <textarea
                id="contact-message"
                rows="4"
                required
                maxLength={MESSAGE_LIMIT}
                value={form.message}
                onChange={handle("message")}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your idea, timeline, or question…"
                className="w-full bg-transparent px-4 pt-3 pb-6 text-sm focus:outline-none resize-none"
                style={{ color: "var(--text)" }}
              />
              <div className="absolute bottom-2 right-3 text-[10px] font-mono opacity-50 tabular-nums">
                {form.message.length} / {MESSAGE_LIMIT}
              </div>
            </FieldShell>
          </div>

          {/* Signal + Submit */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <SignalMeter value={signal} />

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.97 : 1 }}
              className="relative overflow-hidden flex-1 group rounded-lg font-mono text-sm tracking-[0.2em] font-bold py-3.5 px-5 disabled:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, var(--secondary)))",
                color: "white",
                boxShadow:
                  "0 8px 30px -6px color-mix(in srgb, var(--primary) 70%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              {/* shimmer */}
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-1/3 -skew-x-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                }}
                animate={{ left: ["-30%", "130%"] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="relative flex items-center justify-center gap-2"
                  >
                    <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    SEND MESSAGE
                  </motion.span>
                )}
                {status === "sending" && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex items-center justify-center gap-2"
                  >
                    <Loader2 size={15} className="animate-spin" />
                    OPENING MAIL…
                  </motion.span>
                )}
                {status === "sent" && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    DRAFT READY
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>

        {/* Direct channels */}
        <div
          className="relative flex flex-wrap items-center gap-2 px-5 sm:px-7 py-4 border-t"
          style={{ borderColor: "var(--card-border)" }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-60 mr-1">
            Or directly
          </span>
          <CopyEmailChip />
          {CHANNELS.map(({ label, href, icon: Icon }) => (
            <Chip key={label} as="a" href={href} target="_blank" rel="noreferrer">
              <Icon size={13} />
              {label}
            </Chip>
          ))}
          <Chip as="span">
            <MapPin size={13} />
            Lalitpur, Nepal
          </Chip>
        </div>
      </div>
    </div>
  );
};

const Dot = ({ color, pulse }) => (
  <span
    className={`w-2.5 h-2.5 rounded-full ${pulse ? "animate-pulse" : ""}`}
    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
  />
);

const FieldLabel = ({ htmlFor, icon: Icon, label, required }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-1.5 mb-1.5 font-mono text-[10px] tracking-[0.25em] uppercase opacity-70"
  >
    <Icon size={11} />
    <span>{label}</span>
    {required && <span style={{ color: "var(--primary)" }}>*</span>}
  </label>
);

const FieldShell = ({ focused, children }) => (
  <div
    className="relative rounded-lg transition-shadow"
    style={{
      background: "color-mix(in srgb, var(--bg) 60%, transparent)",
      border: "1px solid var(--card-border)",
      boxShadow: focused
        ? "0 0 0 2px color-mix(in srgb, var(--primary) 35%, transparent)"
        : "none",
    }}
  >
    {children}
    {/* Animated bottom rail */}
    <motion.span
      aria-hidden
      className="absolute left-0 right-0 bottom-0 h-[2px] origin-left rounded-b-lg"
      style={{
        background: "linear-gradient(90deg, var(--primary), var(--secondary))",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: focused ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </div>
);

const FieldInput = ({ field, value, onChange, focused, setFocused }) => {
  const id = `contact-${field.key}`;
  return (
    <div>
      <FieldLabel htmlFor={id} icon={field.icon} label={field.label} required={field.required} />
      <FieldShell focused={focused}>
        <input
          id={id}
          type={field.type || "text"}
          required={field.required}
          autoComplete={field.autoComplete}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(field.key)}
          onBlur={() => setFocused(null)}
          placeholder={field.placeholder}
          className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
          style={{ color: "var(--text)" }}
        />
      </FieldShell>
    </div>
  );
};

const Chip = ({ as: Tag = "button", children, ...props }) => (
  <Tag
    {...props}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors hover:text-(--primary)"
    style={{
      background: "color-mix(in srgb, var(--bg) 50%, transparent)",
      border: "1px solid var(--card-border)",
    }}
  >
    {children}
  </Tag>
);

const CopyEmailChip = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <Chip type="button" onClick={copy} title="Copy email address">
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : CONTACT_EMAIL}
    </Chip>
  );
};

const SignalMeter = ({ value }) => {
  const bars = 8;
  const active = Math.round((value / 100) * bars);
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[10px]"
      title="Message completeness"
      style={{
        background: "color-mix(in srgb, var(--bg) 50%, transparent)",
        border: "1px dashed var(--card-border)",
      }}
    >
      <span className="opacity-60 tracking-[0.2em]">SIG</span>
      <span className="flex items-end gap-[2px] h-4">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm transition-colors duration-300"
            style={{
              height: `${(i + 1) * (16 / bars)}px`,
              background:
                i < active
                  ? "var(--primary)"
                  : "color-mix(in srgb, var(--text) 25%, transparent)",
              boxShadow:
                i < active
                  ? "0 0 6px color-mix(in srgb, var(--primary) 80%, transparent)"
                  : "none",
            }}
          />
        ))}
      </span>
      <span className="tabular-nums opacity-80 w-7 text-right">{value}%</span>
    </div>
  );
};

const CornerBrackets = () => {
  const base =
    "absolute z-10 w-5 h-5 pointer-events-none border-[var(--primary)] opacity-70";
  return (
    <>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2 rounded-tl-md`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2 rounded-tr-md`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} />
    </>
  );
};

export default ContactCard;
