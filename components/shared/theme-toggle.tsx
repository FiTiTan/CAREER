'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full flex items-center justify-center">
        <div className="w-[18px] h-[18px]" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full flex items-center justify-center
                 hover:bg-[var(--calm-bg-hover)] transition-colors"
      aria-label="Changer le thème"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-[var(--calm-text-muted)]" />
      ) : (
        <Moon size={18} className="text-[var(--calm-text-muted)]" />
      )}
    </button>
  );
}
