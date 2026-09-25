import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MIN_TIME_BETWEEN_SUBMITS_MS = 60 * 1000; // 1 minute
const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;

const sanitize = (str) => str.replace(/[<>]/g, "").trim();

const getSubmissionLog = () => {
  try {
    return JSON.parse(localStorage.getItem("contact_submissions") || "[]");
  } catch {
    return [];
  }
};

const isRateLimited = () => {
  const log = getSubmissionLog();
  const now = Date.now();
  const recent = log.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS) return true;
  if (recent.length > 0 && now - recent[recent.length - 1] < MIN_TIME_BETWEEN_SUBMITS_MS) {
    return true;
  }
  return false;
};

const recordSubmission = () => {
  const log = getSubmissionLog();
  const now = Date.now();
  const recent = log.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  localStorage.setItem("contact_submissions", JSON.stringify(recent));
};

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot — real users never see or fill this
  });
  const [status, setStatus] = useState(null); // null | sending | sent | error | rate_limited

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLen = name === "message" ? MAX_MESSAGE_LENGTH : MAX_NAME_LENGTH;
    setFormData({ ...formData, [name]: value.slice(0, maxLen) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check — if this hidden field has a value, it's a bot
    if (formData.website) {
      setStatus("sent"); // pretend success so bots don't retry differently
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setStatus("error");
      return;
    }

    if (isRateLimited()) {
      setStatus("rate_limited");
      return;
    }

    setStatus("sending");

    const cleanData = {
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        message: sanitize(formData.message),
        time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        cleanData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        recordSubmission();
        setStatus("sent");
        setFormData({ name: "", email: "", message: "", website: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <section className="contact" id="contacts">
      <div className="contact-blob contact-blob-1"></div>
      <div className="contact-blob contact-blob-2"></div>

      <div className="contact-content">
        <div className="contact-header">
          <span className="contact-label">GET IN TOUCH</span>
          <h2 className="contact-title">Let's Build Something Together</h2>
        </div>

        <div className="contact-body">
          <div className="contact-text">
            <p>
              I'm always open to discussing projects, opportunities, or
              potential collaboration. Want to make it happen?
            </p>
          </div>

          <form
            className="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {/* Honeypot field — hidden from real users via CSS, bots fill it anyway */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="honeypot"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="form-row">
              <label htmlFor="name">NAME:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                maxLength={MAX_NAME_LENGTH}
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">EMAIL:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                maxLength={MAX_NAME_LENGTH}
              />
            </div>

            <div className="form-row">
              <label htmlFor="message">MESSAGE:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                maxLength={MAX_MESSAGE_LENGTH}
              />
            </div>

            <button
              type="submit"
              className="contact-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>

            {status === "sent" && (
              <p className="form-status success">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-status error">
                Please check your details and try again.
              </p>
            )}
            {status === "rate_limited" && (
              <p className="form-status error">
                Too many messages sent recently. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;