import { useEffect, useRef, useState } from "react";

/**
 * AboutSection Component
 * -----------------------
 * A visually interactive section that highlights:
 * - Core expertise areas
 * - Key professional stats
 * 
 * Features:
 * - IntersectionObserver triggers smooth fade-in animations
 * - Animated cosmic background particles
 * - Gradient hover effects with glowing borders
 * - Floating particle accents inside expertise cards
 */
export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /** Professional Stats */
  const stats = [
    { label: "Years Experience", value: "5+", icon: "🚀" },
    { label: "Galactic Projects", value: "50+", icon: "🌌" },
    { label: "Technologies", value: "25+", icon: "⚡" },
    { label: "Happy Clients", value: "30+", icon: "✨" },
  ];

  /** Core Expertise Areas */
  const expertise = [
    {
      icon: "💻",
      title: "Full Stack Developer",
      description:
        "Building end-to-end web applications with modern frameworks and databases.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "☁️",
      title: "Cloud Support",
      description:
        "Deploying and managing scalable applications on cloud platforms.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "⚙️",
      title: "DevOps",
      description:
        "Streamlining development workflows with CI/CD and infrastructure automation.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: "🤖",
      title: "Machine Learning",
      description:
        "Implementing AI-driven solutions and intelligent applications.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  /** Trigger animation when section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      id="about"
    >
      {/* Starfield background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <header
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-500/20 blur-xl animate-pulse" />
          </div>
          <p className="text-gray-300 text-base max-w-3xl mx-auto leading-relaxed">
            Specialized in creating digital experiences that push the boundaries
            of technology and innovation.
          </p>
        </header>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="group relative text-center bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/70 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div
                  className="text-2xl mb-2 animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-pulse">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Expertise Section */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
          }`}
        >
          {expertise.map((item, index) => (
            <article
              key={item.title}
              className="group relative bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-center hover:border-cyan-500/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`,
                      animation: "float 3s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="text-3xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Glowing border */}
              <div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                style={{
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
