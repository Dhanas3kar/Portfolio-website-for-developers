import { useEffect, useRef, useState, useMemo } from 'react';

function generateStarField(starCount = 80) {
  return useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.7,
        animationDuration: Math.random() * 2 + 1.5,
        animationDelay: Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.5,
      })),
    [starCount]
  );
}

export function SkillsSection() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React/Next.js', proficiency: 95 },
        { name: 'TypeScript', proficiency: 90 },
        { name: 'Three.js/WebGL', proficiency: 85 },
        { name: 'Tailwind CSS', proficiency: 92 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', proficiency: 88 },
        { name: 'Python', proficiency: 85 },
        { name: 'PostgreSQL', proficiency: 82 },
        { name: 'GraphQL', proficiency: 78 },
      ],
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'Git/GitHub', proficiency: 92 },
        { name: 'Docker', proficiency: 85 },
        { name: 'AWS', proficiency: 80 },
        { name: 'Figma', proficiency: 75 },
      ],
    },
  ];

  const experienceTimeline = [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      duration: '2022 - Present',
      summary: 'Leading development of complex web applications using React and Three.js',
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      duration: '2020 - 2022',
      summary: 'Built scalable web applications and APIs for various client projects',
    },
    {
      role: 'Junior Developer',
      company: 'StartUp Studios',
      duration: '2019 - 2020',
      summary: 'Contributed to multiple projects focusing on modern web technologies',
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  const stars = generateStarField(90);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 60% 20%, rgba(60, 60, 120, 0.18) 0%, transparent 60%),
          radial-gradient(ellipse at 10% 80%, rgba(80, 60, 140, 0.12) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 70%, rgba(120, 80, 200, 0.10) 0%, transparent 80%),
          linear-gradient(135deg, #090a1a 0%, #0a0820 100%)
        `,
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              filter: 'drop-shadow(0 0 6px #fff)',
              animation: `starTwinkle ${star.animationDuration}s infinite alternate ${star.animationDelay}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute z-0 pointer-events-none">
        <div className="absolute left-[30%] top-[10%] w-96 h-96 bg-purple-900 opacity-10 rounded-full blur-3xl" />
        <div className="absolute right-[15%] bottom-[10%] w-72 h-72 bg-blue-900 opacity-10 rounded-full blur-2xl" />
        <div className="absolute left-[60%] bottom-[20%] w-60 h-60 bg-pink-900 opacity-10 rounded-full blur-2xl" />
      </div>
      <div ref={sectionRef} className="relative z-10 w-full max-w-7xl px-6 py-20">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide" style={{ fontFamily: 'monospace' }}>
            Internships & Experience
          </h2>
          <p className="text-gray-400 text-lg">Technical skills and professional experience across various domains</p>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 48px rgba(40, 40, 80, 0.4)' }}
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-blue-300 text-sm">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.proficiency}%` : '0%',
                          transitionDelay: isVisible ? `${(categoryIndex * 4 + skillIndex) * 100}ms` : '0ms',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <section className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Professional Experience</h3>
          <div className="relative space-y-6 before:absolute before:left-2.5 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-700/30 before:to-purple-700/10 before:rounded-full before:z-0">
            {experienceTimeline.map((job, index) => (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 shadow"
                style={{ marginLeft: '1.5rem' }}
              >
                <div className="absolute -left-7 top-7 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-white/10 shadow-lg animate-timeline-dot" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{job.role}</h4>
                  <span className="text-blue-400 font-medium">{job.duration}</span>
                </div>
                <p className="text-purple-300 mb-2">{job.company}</p>
                <p className="text-gray-400">{job.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <style jsx>{`
        @keyframes starTwinkle {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }
        .animate-timeline-dot {
          animation: timelineDotPulse 2s infinite alternate;
        }
        @keyframes timelineDotPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.27), 0 0 0 0 rgba(167, 139, 250, 0.2);
          }
          100% {
            box-shadow: 0 0 8px 6px rgba(96, 165, 250, 0.27), 0 0 16px 12px rgba(167, 139, 250, 0.2);
          }
        }
      `}</style>
    </section>
  );
}