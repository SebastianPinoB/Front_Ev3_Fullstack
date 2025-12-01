import type { ReactNode } from "react";
import UserHeader from "~/components/organisms/user/UserHeader";
import { useNavigate } from "react-router-dom";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <UserHeader />
        </div>

        <div className="mt-2 bg-white rounded-xl shadow-sm p-6">{children}</div>
      </div>
    </div>
  );
}
