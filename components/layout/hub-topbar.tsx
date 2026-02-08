'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import {
  Diamond,
  Search,
  Bell,
  User,
  Settings,
  Star,
  LogOut,
} from 'lucide-react';

interface HubTopbarProps {
  userName?: string;
  userAvatar?: string;
  planBadge?: 'free' | 'pro' | 'business';
}

export function HubTopbar({ userName, userAvatar, planBadge = 'free' }: HubTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const planLabels = {
    free: { label: 'Free', class: 'bg-[var(--calm-bg-hover)] text-[var(--calm-text-muted)]' },
    pro: { label: 'Pro', class: 'bg-gradient-to-r from-[var(--calm-primary)] to-[var(--calm-accent)] text-white' },
    business: { label: 'Business', class: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black' },
  };

  return (
    <header className="h-16 bg-[var(--calm-bg-elevated)] border-b border-[var(--calm-border)] flex items-center px-4 lg:px-6">
      {/* Mobile: Logo */}
      <div className="lg:hidden">
        <Link href="/hub" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00d4aa15] flex items-center justify-center">
            <Diamond size={18} className="text-[#00d4aa]" />
          </div>
          <span className="font-semibold">CareerCare</span>
        </Link>
      </div>

      {/* Desktop: Search */}
      <div className="hidden lg:flex flex-1 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher... (⌘K)"
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[var(--calm-bg-hover)] border border-[var(--calm-border)] text-sm placeholder:text-[var(--calm-text-muted)] focus:outline-none focus:border-[var(--calm-primary)]"
            onFocus={() => setSearchOpen(true)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--calm-text-muted)]" />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Mobile: Search button */}
        <button
          className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--calm-bg-hover)] transition-colors"
          onClick={() => setSearchOpen(true)}
          aria-label="Rechercher"
        >
          <Search size={18} className="text-[var(--calm-text-muted)]" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button 
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--calm-bg-hover)] transition-colors relative" 
          aria-label="Notifications"
        >
          <Bell size={18} className="text-[var(--calm-text-muted)]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--calm-error)] rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-[var(--calm-bg-hover)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--calm-primary-light)] flex items-center justify-center">
              {userAvatar ? (
                <img src={userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={16} className="text-[var(--calm-primary)]" />
              )}
            </div>
            <span className={`hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${planLabels[planBadge].class}`}>
              {planLabels[planBadge].label}
            </span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--calm-bg-card)] border border-[var(--calm-border)] rounded-xl shadow-lg z-50 py-2">
                <div className="px-4 py-2 border-b border-[var(--calm-border)]">
                  <p className="font-medium truncate">{userName || 'Utilisateur'}</p>
                  <p className="text-sm text-[var(--calm-text-muted)]">Plan {planLabels[planBadge].label}</p>
                </div>
                <nav className="py-2">
                  <Link
                    href="/hub/settings/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--calm-bg-hover)] transition-colors text-[var(--calm-text-secondary)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Mon profil</span>
                  </Link>
                  <Link
                    href="/hub/settings/subscription"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--calm-bg-hover)] transition-colors text-[var(--calm-text-secondary)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Star size={16} />
                    <span>Abonnement</span>
                  </Link>
                  <Link
                    href="/hub/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--calm-bg-hover)] transition-colors text-[var(--calm-text-secondary)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Paramètres</span>
                  </Link>
                </nav>
                <div className="border-t border-[var(--calm-border)] pt-2">
                  <button
                    className="flex items-center gap-3 px-4 py-2 w-full text-left text-[var(--calm-error)] hover:bg-[var(--calm-bg-hover)] transition-colors"
                    onClick={() => {
                      // TODO: Logout logic
                      setMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Modal */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed inset-x-4 top-4 z-50 lg:hidden">
            <div className="bg-[var(--calm-bg-card)] rounded-xl shadow-lg p-4 border border-[var(--calm-border)]">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full h-10 px-4 rounded-full bg-[var(--calm-bg-hover)] border border-[var(--calm-border)] text-sm placeholder:text-[var(--calm-text-muted)] focus:outline-none focus:border-[var(--calm-primary)]"
                autoFocus
              />
              <p className="text-sm text-[var(--calm-text-muted)] mt-3 text-center">
                Tapez pour rechercher dans CareerCare
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
