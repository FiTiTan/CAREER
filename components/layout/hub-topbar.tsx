'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HubTopbarProps {
  userName?: string;
  userAvatar?: string;
  planBadge?: 'free' | 'pro' | 'business';
}

export function HubTopbar({ userName, userAvatar, planBadge = 'free' }: HubTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const planLabels = {
    free: { label: 'Free', class: 'pill-free' },
    pro: { label: 'Pro', class: 'pill-pro' },
    business: { label: 'Business', class: 'pill-business' },
  };

  return (
    <header className="h-16 bg-elevated border-b border-subtle flex items-center px-4 lg:px-6">
      {/* Mobile: Logo */}
      <div className="lg:hidden">
        <Link href="/hub" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-lg">
            ◆
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
            className="input pl-10"
            onFocus={() => setSearchOpen(true)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Mobile: Search button */}
        <button
          className="lg:hidden btn-icon btn-ghost"
          onClick={() => setSearchOpen(true)}
          aria-label="Rechercher"
        >
          🔍
        </button>

        {/* Notifications */}
        <button className="btn-icon btn-ghost relative" aria-label="Notifications">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-hover transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
              {userAvatar ? (
                <img src={userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-sm">👤</span>
              )}
            </div>
            <span className={`hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full ${planLabels[planBadge].class}`}>
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
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-subtle rounded-xl shadow-lg z-50 py-2 animate-fade-in-down">
                <div className="px-4 py-2 border-b border-subtle">
                  <p className="font-medium truncate">{userName || 'Utilisateur'}</p>
                  <p className="text-sm text-muted">Plan {planLabels[planBadge].label}</p>
                </div>
                <nav className="py-2">
                  <Link
                    href="/hub/settings/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-hover transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>👤</span>
                    <span>Mon profil</span>
                  </Link>
                  <Link
                    href="/hub/settings/subscription"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-hover transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>⭐</span>
                    <span>Abonnement</span>
                  </Link>
                  <Link
                    href="/hub/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-hover transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>⚙️</span>
                    <span>Paramètres</span>
                  </Link>
                </nav>
                <div className="border-t border-subtle pt-2">
                  <button
                    className="flex items-center gap-3 px-4 py-2 w-full text-left text-error hover:bg-hover transition-colors"
                    onClick={() => {
                      // TODO: Logout logic
                      setMenuOpen(false);
                    }}
                  >
                    <span>🚪</span>
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
            <div className="bg-card rounded-xl shadow-lg p-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="input w-full"
                autoFocus
              />
              <p className="text-sm text-muted mt-3 text-center">
                Tapez pour rechercher dans CareerCare
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
