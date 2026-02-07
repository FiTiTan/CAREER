'use client';

import { useState } from 'react';
import Link from 'next/link';

const settingsNav = [
  { href: '/hub/settings/profile', label: 'Profil', icon: '👤' },
  { href: '/hub/settings/security', label: 'Sécurité', icon: '🔐' },
  { href: '/hub/settings/subscription', label: 'Abonnement', icon: '⭐' },
  { href: '/hub/settings/billing', label: 'Facturation', icon: '💳' },
  { href: '/hub/settings/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/hub/settings/privacy', label: 'Confidentialité', icon: '🔒' },
];

export default function ProfileSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Save to Supabase
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-8">
        {/* Sidebar */}
        <nav className="hidden md:block w-48 flex-shrink-0">
          <ul className="space-y-1">
            {settingsNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                    ${item.href === '/hub/settings/profile'
                      ? 'bg-primary-light text-primary'
                      : 'text-secondary hover:bg-hover'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Profil</h1>
            <p className="text-secondary mt-1">
              Gérez vos informations personnelles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="card">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h3 className="font-medium mb-2">Photo de profil</h3>
                  <button type="button" className="btn btn-secondary btn-sm">
                    Modifier
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="card space-y-4">
              <h3 className="font-semibold">Informations personnelles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prénom</label>
                  <input type="text" className="input" placeholder="Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input type="text" className="input" placeholder="Dupont" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="input" placeholder="jean@exemple.fr" disabled />
                <p className="text-xs text-muted mt-1">
                  Pour changer d'email, contactez le support.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Poste actuel</label>
                <input type="text" className="input" placeholder="Développeur Full-Stack" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  className="input min-h-[100px]"
                  placeholder="Parlez-nous de vous..."
                />
              </div>
            </div>

            {/* Links */}
            <div className="card space-y-4">
              <h3 className="font-semibold">Liens</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Site web</label>
                <input type="url" className="input" placeholder="https://monsite.fr" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input type="url" className="input" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
