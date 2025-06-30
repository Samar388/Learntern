"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { FaUser, FaTasks } from "react-icons/fa";

const mentorNavItems = [
  {
    name: "Profile",
    href: "/intern/profile",
    icon: <FaUser className="mr-3" />,
  },
  {
    name: "View Modules",
    href: "/intern/module/all",
    icon: <FaTasks className="mr-3" />,
  },
];

const MentorLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSidebar =
    pathname === "/intern/login" || pathname === "/intern/signup";

  if (hideSidebar) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col min-h-screen">
        <Sidebar navItems={mentorNavItems} />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MentorLayout;
