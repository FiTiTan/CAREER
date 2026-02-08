'use client';

import { HubSidebar } from '@/components/layout/hub-sidebar';
import { HubBottomNav } from '@/components/layout/hub-bottom-nav';
import { HubTopbar } from '@/components/layout/hub-topbar';
import { SidebarProvider, useSidebar } from '@/lib/contexts/sidebar-context';

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
    <SidebarProvider>
      <HubLayoutContent>{children}</HubLayoutContent>
    </SidebarProvider>
  );
}
