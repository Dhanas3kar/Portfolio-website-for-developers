import { useState, useRef, useEffect } from 'react';
import { Rocket, Telescope, Satellite, Zap, MessageSquare } from 'lucide-react';

// --- Data Definition (moved outside for clarity) ---
const NAV_ITEMS = [
  { id: 'home', label: 'Origin', Icon: Rocket },
  { id: 'about', label: 'Explorer', Icon: Telescope },
  { id: 'projects', label: 'Missions', Icon: Satellite },
  { id: 'skills', label: 'Arsenal', Icon: Zap },
  { id: 'contact', label: 'Transmission', Icon: MessageSquare },
];

// --- Component Props ---
interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Effect to move the indicator when the active section changes
  useEffect(() => {
    const containerNode = containerRef.current;
    if (!containerNode) {
      return;
    }

    const activeButton = containerNode.querySelector(`[data-section-id='${activeSection}']`) as HTMLElement;
    if (activeButton) {
      setIndicatorStyle({
        left: `${activeButton.offsetLeft}px`,
        width: `${activeButton.offsetWidth}px`,
      });
    }
  }, [activeSection]);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={containerRef}
        className="relative flex items-center p-1 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl shadow-black/30"
      >
        {/* Sliding Indicator */}
        <div
          className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full bg-white/10 ring-1 ring-blue-500/50 transition-all duration-500 ease-in-out"
          style={indicatorStyle}
        />

        {/* Navigation Buttons */}
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              data-section-id={id} // Use data attribute for easy selection
              onClick={() => onNavigate(id)}
              className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
            >
              <Icon size={16} className={isActive ? 'text-blue-300' : ''} />
              <span className="tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}