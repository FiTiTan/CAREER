'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSubscription } from '@/lib/hooks/use-subscription';
import { useSidebar } from '@/lib/contexts/sidebar-context';
import { ModuleIcon, MODULE_COLORS } from '@/components/ui/module-icon';
import {
  Diamond,
  FileText,
  Palette,
  Target,
  Linkedin,
  Lock,
  Globe,
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

// Navigation items avec icônes Lucide
const toolsNav = [
  { href: '/hub/cv-coach', label: 'CV Coach', icon: FileText, module: 'cv-coach' },
  { href: '/hub/portfolio', label: 'Portfolio', icon: Palette, module: 'portfolio' },
  { href: '/hub/job-match', label: 'Job Match', icon: Target, module: 'job-match' },
  { href: '/hub/linkedin', label: 'LinkedIn', icon: Linkedin, module: 'linkedin' },
  { href: '/hub/vault', label: 'Coffre-Fort', icon: Lock, module: 'vault' },
  { href: '/hub/e-reputation', label: 'E-Réputation', icon: Globe, module: 'e-reputation' },
];

const plusNav = [
  { href: '/hub/boutique', label: 'Boutique', icon: ShoppingBag, module: 'boutique' },
  { href: '/hub/settings', label: 'Paramètres', icon: Settings, module: 'settings' },
];

export function HubSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  const isActive = (href: string) => {
    if (href === '/hub') return pathname === '/hub';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        hidden lg:flex flex-col h-screen fixed left-0 top-0
        bg-[var(--calm-bg-elevated)]
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--calm-border)]">
        <Link href="/hub" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00d4aa15] flex items-center justify-center">
            <Diamond size={18} className="text-[#00d4aa]" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg">CareerCare</span>
          )}
        </Link>
        <button
          onClick={toggle}
          className="ml-auto p-2 hover:bg-[var(--calm-bg-hover)] rounded-lg text-[var(--calm-text-muted)]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col py-4 px-2 overflow-y-auto">
        {/* CareerScore - Item isolé */}
        <SidebarItem
          href="/hub"
          Icon={Diamond}
          module="score"
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
                Icon={item.icon}
                module={item.module}
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
                Icon={item.icon}
                module={item.module}
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

// Composant Item de sidebar avec icônes SVG
function SidebarItem({
  href,
  Icon,
  module,
  label,
  active,
  collapsed,
  badge,
}: {
  href: string;
  Icon: LucideIcon;
  module: string;
  label: string;
  active: boolean;
  collapsed: boolean;
  badge?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = MODULE_COLORS[module] || '#00d4aa';

  // Couleur du texte : couleur du module si actif ou hover, sinon gris
  const textColor = (active || hovered) ? color : 'var(--calm-text-secondary)';

  return (
    <Link
      href={href}
      className={`
        flex items-center h-10 rounded-full
        transition-all duration-300 ease-in-out
        ${collapsed 
          ? 'w-10 justify-center mx-auto' 
          : 'px-3 w-full'
        }
        ${active
          ? 'bg-[rgba(0,212,170,0.1)]'
          : 'hover:bg-[var(--calm-bg-hover)]'
        }
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icône */}
      <div className="w-5 flex-shrink-0 flex items-center justify-center">
        <Icon size={18} style={{ color }} />
      </div>
      
      {/* Texte - avec transition */}
      <span 
        className={`
          text-sm font-medium whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${collapsed 
            ? 'w-0 opacity-0 overflow-hidden' 
            : 'ml-3 opacity-100'
          }
        `}
        style={{ color: textColor }}
      >
        {label}
      </span>
      
      {/* Badge */}
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
