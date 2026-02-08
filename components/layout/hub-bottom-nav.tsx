'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Diamond,
  LayoutGrid,
  Bell,
  ShoppingBag,
  User,
  FileText,
  Palette,
  Linkedin,
  Target,
  Lock,
  Globe,
  LucideIcon,
} from 'lucide-react';
import { MODULE_COLORS } from '@/components/ui/module-icon';

interface NavTab {
  id: string;
  href?: string;
  label: string;
  Icon: LucideIcon;
  action?: 'drawer';
}

const tabs: NavTab[] = [
  { id: 'score', href: '/hub', label: 'Score', Icon: Diamond },
  { id: 'tools', label: 'Outils', Icon: LayoutGrid, action: 'drawer' },
  { id: 'alerts', href: '/hub/job-match/alerts', label: 'Alertes', Icon: Bell },
  { id: 'boutique', href: '/hub/boutique', label: 'Boutique', Icon: ShoppingBag },
  { id: 'profile', href: '/hub/settings/profile', label: 'Profil', Icon: User },
];

const toolsDrawerItems = [
  { href: '/hub/cv-coach', label: 'CV Coach', Icon: FileText, module: 'cv-coach' },
  { href: '/hub/portfolio', label: 'Portfolio', Icon: Palette, module: 'portfolio' },
  { href: '/hub/linkedin', label: 'LinkedIn', Icon: Linkedin, module: 'linkedin' },
  { href: '/hub/job-match', label: 'Job Match', Icon: Target, module: 'job-match' },
  { href: '/hub/vault', label: 'Coffre-Fort', Icon: Lock, module: 'vault' },
  { href: '/hub/e-reputation', label: 'E-Réputation', Icon: Globe, module: 'e-reputation' },
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
          bg-[var(--calm-bg-card)] border-t border-[var(--calm-border)] rounded-t-2xl
          transform transition-transform duration-300
          ${drawerOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="p-4">
          <div className="w-12 h-1 bg-[var(--calm-text-muted)] rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-4">Modules</h3>
          <div className="grid grid-cols-3 gap-3">
            {toolsDrawerItems.map((item) => {
              const color = MODULE_COLORS[item.module];
              const active = pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl
                    transition-colors duration-150
                    ${active
                      ? 'bg-[var(--calm-primary-light)]'
                      : 'bg-[var(--calm-bg-hover)] hover:bg-[var(--calm-bg-active)]'
                    }
                  `}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <item.Icon size={24} style={{ color }} />
                  </div>
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--calm-bg-card)] border-t border-[var(--calm-border)]"
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
                      ? 'text-[var(--calm-primary)]'
                      : 'text-[var(--calm-text-muted)] hover:text-[var(--calm-text-secondary)]'
                    }
                  `}
                >
                  <tab.Icon size={20} />
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
                    ? 'text-[var(--calm-primary)]'
                    : 'text-[var(--calm-text-muted)] hover:text-[var(--calm-text-secondary)]'
                  }
                `}
              >
                <tab.Icon size={20} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
