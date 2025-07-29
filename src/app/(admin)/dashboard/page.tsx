
'use client';

import { AdminPanel } from '@/components/features/admin/AdminPanel';

export default function AdminDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-100">
      <AdminPanel />
    </main>
  );
}
