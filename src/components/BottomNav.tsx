import React from 'react';
import { Sparkles, BookOpen, Compass, Users, Clock } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeSection, onNavigate }) => {
  const items = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'path', label: 'Path', icon: Compass },
    { id: 'heroes', label: 'Heroes', icon: Users },
    { id: 'timeline', label: 'Annals', icon: Clock },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-void/95 backdrop-blur-lg border-t border-gold-500/25 px-2 py-1.5 shadow-2xl flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeSection === item.id || (item.id === 'hero' && activeSection === '');

        return (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              if (item.id === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
              isActive ? 'text-gold-400 scale-105' : 'text-parchment/60 hover:text-ivory'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5 transition-transform" />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-glow" />
              )}
            </div>
            <span
              className={`text-[10px] font-serif tracking-wider mt-1 transition-colors ${
                isActive ? 'font-bold text-gold-300' : 'font-normal'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
