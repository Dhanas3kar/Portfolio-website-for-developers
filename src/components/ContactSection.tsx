import { useState, useMemo } from "react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

function useStars(count = 120) {
  return useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.7,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.5,
      })),
    [count]
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const stars = useStars(120);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dhanasekarmurgesan@gmail.com",
      href: "mailto:dhanasekarmurgesan@gmail.com",
      color: "bg-blue-700",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Trichy, India",
      href: "#",
      color: "bg-purple-700",
    },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Dhanas3kar", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhanasekar-murugesan-a9321731a/",
      label: "LinkedIn",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden w-full min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 60% 20%, rgba(60,60,120,0.4) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 10% 80%, rgba(80,60,140,0.3) 0%, transparent 70%)," +
          "radial-gradient(ellipse at 80% 70%, rgba(120,80,200,0.2) 0%, transparent 80%)," +
          "linear-gradient(135deg, #090a1a 0%, #0a0820 100%)",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: "white",
              opacity: s.opacity,
              filter: "drop-shadow(0 0 6px #fff)",
              animation: `starTwinkle ${s.duration}s infinite alternate`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute z-0 pointer-events-none">
        <div className="absolute left-[30%] top-[10%] w-96 h-96 bg-purple-900 opacity-25 rounded-full blur-3xl" />
        <div className="absolute right-[15%] bottom-[10%] w-72 h-72 bg-blue-900 opacity-30 rounded-full blur-2xl" />
        <div className="absolute left-[60%] bottom-[20%] w-60 h-60 bg-pink-900 opacity-20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center">
        <h1
          className="text-center text-4xl md:text-5xl font-bold text-blue-200 mb-3 tracking-wide"
          style={{ fontFamily: "monospace" }}
        >
          Let's Connect
        </h1>
        <p className="text-center text-blue-100/80 text-lg mb-12 max-w-2xl">
          Ready to collaborate on AI, research and innovation? Let's discuss how we can build the future together.
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 min-w-[320px] max-w-md flex flex-col justify-between"
            style={{ boxShadow: "0 4px 48px 0 rgba(40,40,80,0.4)" }}>
            <h2 className="text-2xl font-bold text-blue-100 mb-6" style={{ fontFamily: "monospace" }}>
              Get In Touch
            </h2>
            {contactInfo.map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-4 mb-4 group">
                <div className={`w-12 h-12 ${item.color} bg-opacity-80 rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-blue-100 text-sm">{item.label}</div>
                  <div className="text-blue-50 font-semibold">{item.value}</div>
                </div>
              </a>
            ))}
            <div className="mt-8">
              <div className="text-blue-200 text-sm mb-2">Follow my journey</div>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} aria-label={s.label}
                     className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <s.icon className="w-5 h-5 text-blue-200 group-hover:text-white transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 min-w-[320px] max-w-md flex flex-col justify-between"
            style={{ boxShadow: "0 4px 48px 0 rgba(40,40,80,0.4)" }}>
            <h2 className="text-2xl font-bold text-blue-100 mb-6" style={{ fontFamily: "monospace" }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your Name"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-blue-100 placeholder-blue-300 focus:outline-none focus:border-blue-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Your Email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-blue-100 placeholder-blue-300 focus:outline-none focus:border-blue-400" />
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Your Message" rows={4}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-blue-100 placeholder-blue-300 focus:outline-none focus:border-blue-400 resize-none" />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {submitted && <div className="text-green-400 text-sm">Thank you! Your message has been sent.</div>}
              <button type="submit" disabled={loading}
                className="mt-2 w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white flex items-center justify-center gap-2 shadow-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <span>{loading ? "Sending..." : "Send Message"}</span>
                {!loading && (
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes starTwinkle {
          0% { opacity: 0.7; transform: scale(1);}
          50% { opacity: 1; transform: scale(1.2);}
          100% { opacity: 0.7; transform: scale(1);}
        }
      `}</style>
    </section>
  );
}
