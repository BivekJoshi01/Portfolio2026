import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const SOURCE = `import React, { useState } from "react";

const CHANNELS = [
  { label: "Email",    value: "bvekjoshi03@gmail.com",
    href: "mailto:bvekjoshi03@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/bivekjoshi",
    href: "https://linkedin.com/in/bivekjoshi" },
  { label: "GitHub",   value: "github.com/BivekJoshi01",
    href: "https://github.com/BivekJoshi01" },
  { label: "Location", value: "Lalitpur, Nepal" },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    // TODO: wire to a real backend or EmailJS
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  return (
    <section className="contact">
      <h1>Let's build something together.</h1>
      <p>
        Open to remote roles, freelance projects, and interesting collaborations.
      </p>

      <ul className="channels">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <strong>{c.label}:</strong>{" "}
            {c.href ? (
              <a href={c.href} target="_blank" rel="noreferrer">
                {c.value}
              </a>
            ) : (
              <span>{c.value}</span>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={update("name")} />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
          />
        </label>
        <button type="submit" disabled={sent}>
          {sent ? "Message sent ✓" : "Send"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
`;

const MyContactsVs = () => (
  <VSBodyHelper language="jsx" initialValue={SOURCE} />
);

export default MyContactsVs;
