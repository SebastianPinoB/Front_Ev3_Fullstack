import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8">
        {children}
      </div>
    </div>
  );
}
