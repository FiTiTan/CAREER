'use client';

import { HubSidebar } from '@/components/layout/hub-sidebar';
import { HubBottomNav } from '@/components/layout/hub-bottom-nav';
import { HubTopbar } from '@/components/layout/hub-topbar';
import { SidebarProvider, useSidebar } from '@/lib/contexts/sidebar-context';
import { ScoreProvider } from '@/lib/hooks/use-career-score';
import type { CareerScore } from '@/types/score';

// Mock score data - à remplacer par fetch Supabase
const mockScore: CareerScore = {
  id: '1',
  user_id: 'user-1',
  total: 67,
  pillars: {
    documents: { value: 85, weight: 0.20, module: 'CV Coach', factors: [], trend: 'up' },
    visibility: { value: 60, weight: 0.20, module: 'Portfolio', factors: [], trend: 'stable' },
    network: { value: 45, weight: 0.20, module: 'LinkedIn', factors: [], trend: 'down' },
    dynamique: { value: 72, weight: 0.15, module: 'Job Match', factors: [], trend: 'up' },
    organisation: { value: 30, weight: 0.10, module: 'Coffre-Fort', factors: [], trend: 'stable' },
    presence: { value: 55, weight: 0.15, module: 'E-Réputation', factors: [], trend: 'up' },
  },
  recommended_action: null,
  computed_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function HubLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  // TODO: Fetch user data from Supabase session
  const userData = {
    userName: undefined,
    userAvatar: undefined,
    planBadge: 'free' as const,
  };

  return (
    <div className="min-h-screen bg-[var(--calm-bg)]">
      {/* Sidebar - Desktop only */}
      <HubSidebar />

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ${collapsed ? 'lg:pl-16' : 'lg:pl-60'}`}
      >
        {/* Topbar */}
        <HubTopbar {...userData} />

        {/* Page Content */}
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom Nav - Mobile only */}
      <HubBottomNav />
    </div>
  );
}

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScoreProvider value={mockScore}>
      <SidebarProvider>
        <HubLayoutContent>{children}</HubLayoutContent>
      </SidebarProvider>
    </ScoreProvider>
  );
}
