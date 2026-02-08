'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSubscription } from '@/lib/hooks/use-subscription';

// Navigation items
const toolsNav = [
  { href: '/hub/cv-coach', label: 'CV Coach', icon: '📄' },
  { href: '/hub/portfolio', label: 'Portfolio', icon: '🎨' },
  { href: '/hub/job-match', label: 'Job Match', icon: '🎯' },
  { href: '/hub/linkedin', label: 'LinkedIn', icon: '💼' },
  { href: '/hub/vault', label: 'Coffre-Fort', icon: '🔒' },
  { href: '/hub/e-reputation', label: 'E-Réputation', icon: '🌐' },
];

const plusNav = [
  { href: '/hub/boutique', label: 'Boutique', icon: '🛒' },
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
        bg-[var(--calm-bg-elevated)] border-r border-[var(--calm-border)]
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--calm-border)]">
        <Link href="/hub" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--calm-primary)] flex items-center justify-center text-lg">
            ◆
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg">CareerCare</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-2 hover:bg-[var(--calm-bg-hover)] rounded-lg text-[var(--calm-text-muted)]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col py-4 px-2 overflow-y-auto">
        {/* CareerScore - Item isolé */}
        <SidebarItem
          href="/hub"
          icon="◆"
          label="CareerScore"
          active={isActive('/hub')}
          collapsed={collapsed}
        />

        {/* Séparateur */}
        <div className="my-3 border-t border-[var(--calm-border)]" />

        {/* Groupe OUTILS */}
        {!collapsed && <SidebarGroupLabel>OUTILS</SidebarGroupLabel>}
        <ul className="space-y-1">
          {toolsNav.map((item) => (
            <li key={item.href}>
              <SidebarItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>

        {/* Groupe PLUS */}
        {!collapsed && <SidebarGroupLabel className="mt-4">PLUS</SidebarGroupLabel>}
        <ul className="space-y-1">
          {plusNav.map((item) => (
            <li key={item.href}>
              <SidebarItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>

        {/* Spacer → pousse le CTA en bas */}
        <div className="flex-1" />

        {/* Bloc Plan + CTA Upgrade */}
        {!collapsed && <SidebarPlanCTA />}
      </nav>
    </aside>
  );
}

// Composant Label de groupe
function SidebarGroupLabel({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div
      className={`
        px-3 py-2 text-[10px] font-semibold uppercase tracking-[2px]
        text-[var(--calm-text-muted)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Composant Item de sidebar
function SidebarItem({
  href,
  icon,
  label,
  active,
  collapsed,
  badge,
}: {
  href: string;
  icon: string;
  label: string;
  active: boolean;
  collapsed: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-colors duration-150
        ${active
          ? 'bg-[rgba(0,212,170,0.1)] text-[var(--calm-primary)]'
          : 'text-[var(--calm-text-secondary)] hover:bg-[var(--calm-bg-hover)] hover:text-white'
        }
      `}
    >
      <span className="text-lg w-6 text-center">{icon}</span>
      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
      {!collapsed && badge && (
        <span className="ml-auto text-xs bg-[var(--calm-primary)] text-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

// Composant CTA Plan/Upgrade
function SidebarPlanCTA() {
  const { subscription, loading } = useSubscription();

  if (loading) return null;

  const plan = subscription?.plan || 'free';
  
  // Ne pas afficher si Business
  if (plan === 'business') return null;

  const planConfig = {
    free: { badge: '🆓 Free', cta: 'Passer Pro →', href: '/hub/settings/subscription' },
    pro: { badge: '💎 Pro', cta: 'Passer Business →', href: '/hub/settings/subscription' },
    business: { badge: '🏢 Business', cta: null, href: null },
  };

  const config = planConfig[plan];

  return (
    <div
      className="
        mt-4 p-3 rounded-lg
        bg-[rgba(0,212,170,0.06)]
        border border-[rgba(0,212,170,0.15)]
      "
    >
      <div className="text-sm font-medium mb-1">{config.badge}</div>
      {config.cta && (
        <Link
          href={config.href!}
          className="text-sm text-[var(--calm-primary)] hover:underline"
        >
          {config.cta}
        </Link>
      )}
    </div>
  );
}
