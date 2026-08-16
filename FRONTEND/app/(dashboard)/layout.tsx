'use client';
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
