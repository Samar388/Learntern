"use client";

import React, { useEffect, useState } from "react";
import ModuleService from "@/services/ModuleService";
import { FaBook, FaUserTie, FaUsers } from "react-icons/fa";

const ModuleOverviewPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await ModuleService.readModule();
        setModules(res.data || []);
      } catch (err) {
        setError("Failed to fetch modules");
        setModules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-2">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Module Overview
      </h2>
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">
                <span className="flex items-center gap-2">
                  <FaBook /> Module
                </span>
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                <span className="flex items-center gap-2">
                  <FaUserTie /> Mentor
                </span>
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                <span className="flex items-center gap-2">
                  <FaUsers /> Interns
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  Loading modules...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-red-500">
                  {error}
                </td>
              </tr>
            ) : modules.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  No modules to display.
                </td>
              </tr>
            ) : (
              modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <FaBook className="text-slate-700" />
                      <span className="font-medium text-slate-800">
                        {mod.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      {mod.mentors && mod.mentors.length > 0 ? (
                        <>
                          <img
                            src={mod.mentors[0].avatar}
                            alt={mod.mentors[0].full_name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-300"
                          />
                          <span>{mod.mentors[0].full_name}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-slate-700" />
                      <span>{mod.interns_count ?? 0}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleOverviewPage;
