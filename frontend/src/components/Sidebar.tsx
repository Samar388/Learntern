import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";

const Sidebar = ({
  navItems,
}: {
  navItems: { name: string; href: string; icon: React.ReactNode }[];
}) => {
  const router = useRouter();
  const handleLogout = () => {
    AuthService.logout();
    router.push("/");
  };
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-8 min-h-screen border-r border-gray-200">
      <Logo className="w-32 mb-8" />
      <nav className="w-full flex flex-col gap-2 px-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition-colors font-normal border border-transparent hover:border-black"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto w-full flex flex-col items-center">
        <button
          className="flex items-center gap-2 py-2 px-4 mb-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors font-normal rounded-lg border border-transparent hover:border-black w-11/12"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span className="text-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
