'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavTab {
  id: string;
  href?: string;
  label: string;
  icon: string;
  action?: 'drawer';
}

const tabs: NavTab[] = [
  { id: 'score', href: '/hub', label: 'Score', icon: '◆' },
  { id: 'tools', label: 'Outils', icon: '🧩', action: 'drawer' },
  { id: 'alerts', href: '/hub/job-match/alerts', label: 'Alertes', icon: '🔔' },
  { id: 'boutique', href: '/hub/boutique', label: 'Boutique', icon: '🛒' },
  { id: 'profile', href: '/hub/settings/profile', label: 'Profil', icon: '👤' },
];

const toolsDrawerItems = [
  { href: '/hub/cv-coach', label: 'CV Coach', icon: '📄', color: '#4f8fff' },
  { href: '/hub/portfolio', label: 'Portfolio', icon: '🎨', color: '#8b5cf6' },
  { href: '/hub/linkedin', label: 'LinkedIn', icon: '💼', color: '#0a66c2' },
  { href: '/hub/job-match', label: 'Job Match', icon: '🎯', color: '#06d6a0' },
  { href: '/hub/vault', label: 'Coffre-Fort', icon: '🔒', color: '#ff8c42' },
  { href: '/hub/e-reputation', label: 'E-Réputation', icon: '🌐', color: '#f472b6' },
];

export function HubBottomNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (tab: NavTab) => {
    if (tab.id === 'score') return pathname === '/hub';
    if (tab.id === 'tools') return toolsDrawerItems.some(t => pathname.startsWith(t.href));
    if (tab.href) return pathname.startsWith(tab.href);
    return false;
  };

  return (
    <>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Tools Drawer */}
      <div
        className={`
          fixed bottom-16 left-0 right-0 z-50 lg:hidden
          bg-card border-t border-subtle rounded-t-2xl
          transform transition-transform duration-300
          ${drawerOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="p-4">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-4">Modules</h3>
          <div className="grid grid-cols-3 gap-3">
            {toolsDrawerItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-xl
                  transition-colors duration-150
                  ${pathname.startsWith(item.href)
                    ? 'bg-primary-light'
                    : 'bg-hover hover:bg-active'
                  }
                `}
              >
                <span
                  className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  {item.icon}
                </span>
                <span className="text-xs font-medium text-center">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-subtle"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const active = isActive(tab);

            if (tab.action === 'drawer') {
              return (
                <button
                  key={tab.id}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className={`
                    flex flex-col items-center gap-1 px-3 py-2
                    transition-colors duration-150
                    ${active || drawerOpen
                      ? 'text-primary'
                      : 'text-muted hover:text-secondary'
                    }
                  `}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href!}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2
                  transition-colors duration-150
                  ${active
                    ? 'text-primary'
                    : 'text-muted hover:text-secondary'
                  }
                `}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

// CSS classes reference
const styles = `
  .bg-card { background: var(--calm-bg-card); }
  .bg-hover { background: var(--calm-bg-hover); }
  .bg-active { background: var(--calm-bg-active); }
  .bg-primary-light { background: var(--calm-primary-light); }
  .text-primary { color: var(--calm-primary); }
  .text-secondary { color: var(--calm-text-secondary); }
  .text-muted { color: var(--calm-text-muted); }
  .border-subtle { border-color: var(--calm-border); }
  .bg-muted { background: var(--calm-text-muted); }
`;
