"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaBook, FaTrash } from "react-icons/fa";
import ModuleService from "@/services/ModuleService";

const AdminModulesPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);

      try {
        const res = await ModuleService.readModule();
        setModules(res.data || []);
      } catch (err: any) {
        setError("Failed to fetch modules");
        setModules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this module?")) return;
    try {
      await ModuleService.deleteModule(id);
      setModules((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError("Failed to delete module");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Modules</h2>
          <Link
            href="/admin/module/create"
            className="flex items-center bg-slate-800 text-white px-4 py-2 rounded shadow hover:bg-slate-700 transition text-sm font-semibold"
          >
            <FaPlus className="mr-2" /> Create Module
          </Link>
        </div>
        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 border border-gray-200 text-gray-500 text-center">
            Loading modules...
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow p-8 border border-gray-200 text-red-500 text-center">
            {error}
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 border border-gray-200 text-gray-500 text-center">
            No modules to display yet. Use the button above to create a new
            module.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="flex items-center gap-3 bg-white rounded-lg shadow p-6 border border-gray-200 hover:border-black transition justify-between"
              >
                <div className="flex items-center gap-3">
                  <FaBook className="text-slate-800 text-xl" />
                  <span className="text-lg font-medium text-gray-800">
                    {module.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(module.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 p-2 rounded transition"
                  title="Delete Module"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminModulesPage;
