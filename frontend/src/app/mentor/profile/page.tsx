"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";
import AuthService from "@/services/AuthService";
import { User } from "@/interfaces/User";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getUserProfile();
        setUser(res);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <Logo className="w-26 mb-4" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <Logo className="w-26 mb-4" />
        <span className="text-red-500">Failed to load dashboard.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-2">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-200 flex flex-col items-center">
        <Logo className="w-24 mb-4" />
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.full_name}
            width={100}
            height={100}
            className="rounded-full mb-4 object-cover border border-gray-300"
          />
        )}
        <h1 className="text-2xl font-bold mb-1 text-slate-800 flex items-center gap-2">
          {user.full_name}
        </h1>
        <span className="text-gray-600 text-sm mb-2 flex items-center gap-2">
          {user.email}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs mb-4 uppercase tracking-wide">
          {user.role}
        </span>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-slate-800 text-white px-4 py-2 rounded shadow hover:bg-slate-700 transition text-sm font-semibold"
            onClick={() => {
              document.cookie =
                "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
