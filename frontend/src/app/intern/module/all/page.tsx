"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ModuleService from "@/services/ModuleService";

type Module = {
  id: number;
  title: string;
  mentor: {
    full_name: string;
  };
};

const ModulesList = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ModuleService.getEnrolledModules()
      .then((res) => {
        setModules(res.data || []);
      })
      .catch(() => setModules([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-12">
        <h2 className="text-3xl font-bold mb-8">Your Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-gray-500">Loading...</div>
          ) : modules.length === 0 ? (
            <div className="col-span-full text-gray-500">
              You are not enrolled in any modules yet.
            </div>
          ) : (
            modules.map((module) => (
              <Link
                key={module.id}
                href={`/intern/module/${module.id}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-200 hover:border-blue-400"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-gray-800">
                    {module.title}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                    #{module.id}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  Mentor: {module.mentor.full_name}
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ModulesList;
