import { HubSidebar } from '@/components/layout/hub-sidebar';
import { HubBottomNav } from '@/components/layout/hub-bottom-nav';

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--calm-bg)]">
      {/* Sidebar - Desktop only */}
      <HubSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-60">
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
