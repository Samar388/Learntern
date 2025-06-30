"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { FaBook, FaUserTie, FaUserGraduate, FaUser } from "react-icons/fa";

const adminNavItems = [
  {
    name: "Profile",
    href: "/admin/profile",
    icon: <FaUser className="mr-3" />,
  },
  {
    name: "Modules",
    href: "/admin/module",
    icon: <FaBook className="mr-3" />,
  },
  {
    name: "Modules Overview",
    href: "/admin/module/overview",
    icon: <FaUserTie className="mr-3" />,
  },
  {
    name: "Assign Intern",
    href: "/admin/module/assign-intern",
    icon: <FaUserGraduate className="mr-3" />,
  },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSidebar =
    pathname === "/admin/login" || pathname === "/admin/signup";

  if (hideSidebar) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col min-h-screen">
        <Sidebar navItems={adminNavItems} />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
