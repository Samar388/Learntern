"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { FaBook, FaUser, FaPlus, FaTasks, FaComments } from "react-icons/fa";

const mentorNavItems = [
  {
    name: "Profile",
    href: "/mentor/profile",
    icon: <FaUser className="mr-3" />,
  },
  {
    name: "Add Tasks",
    href: "/mentor/tasks/add",
    icon: <FaPlus className="mr-3" />,
  },
  {
    name: "View Modules",
    href: "/mentor/module",
    icon: <FaTasks className="mr-3" />,
  },
];

const MentorLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSidebar =
    pathname === "/mentor/login" || pathname === "/mentor/signup";

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
