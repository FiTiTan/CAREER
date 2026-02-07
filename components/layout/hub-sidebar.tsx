'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { PILLAR_CONFIG } from '@/types/score';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

const mainNav: NavItem[] = [
  { href: '/hub', label: 'CareerScore', icon: '◆' },
  { href: '/hub/cv-coach', label: 'CV Coach', icon: PILLAR_CONFIG.documents.icon },
  { href: '/hub/portfolio', label: 'Portfolio', icon: PILLAR_CONFIG.visibility.icon },
  { href: '/hub/job-match', label: 'Job Match', icon: PILLAR_CONFIG.dynamique.icon },
  { href: '/hub/linkedin', label: 'LinkedIn', icon: PILLAR_CONFIG.network.icon },
  { href: '/hub/vault', label: 'Coffre-Fort', icon: PILLAR_CONFIG.organisation.icon },
  { href: '/hub/e-reputation', label: 'E-Réputation', icon: PILLAR_CONFIG.presence.icon },
  { href: '/hub/boutique', label: 'Boutique', icon: '🛒' },
];

const bottomNav: NavItem[] = [
  { href: '/hub/settings', label: 'Paramètres', icon: '⚙️' },
];

export function HubSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === '/hub') return pathname === '/hub';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        hidden lg:flex flex-col h-screen fixed left-0 top-0
        bg-elevated border-r border-subtle
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-subtle">
        <Link href="/hub" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-lg">
            ◆
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg">CareerCare</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-2 hover:bg-hover rounded-lg text-muted"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-150
                  ${isActive(item.href)
                    ? 'bg-primary-light text-primary'
                    : 'text-secondary hover:bg-hover hover:text-white'
                  }
                `}
              >
                <span className="text-lg w-6 text-center">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="ml-auto badge badge-primary">{item.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-subtle py-4 px-2">
        <ul className="space-y-1">
          {bottomNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-150
                  ${isActive(item.href)
                    ? 'bg-primary-light text-primary'
                    : 'text-secondary hover:bg-hover hover:text-white'
                  }
                `}
              >
                <span className="text-lg w-6 text-center">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// CSS variables referenced
const styles = `
  .bg-primary { background: var(--calm-primary); }
  .bg-primary-light { background: var(--calm-primary-light); }
  .text-primary { color: var(--calm-primary); }
  .bg-elevated { background: var(--calm-bg-elevated); }
  .bg-hover { background: var(--calm-bg-hover); }
  .border-subtle { border-color: var(--calm-border); }
  .text-secondary { color: var(--calm-text-secondary); }
  .text-muted { color: var(--calm-text-muted); }
`;
