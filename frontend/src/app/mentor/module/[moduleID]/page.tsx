"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModuleService from "@/services/ModuleService";
import { FaTasks, FaEye } from "react-icons/fa";
import Link from "next/link";

const MentorModuleTasksPage = () => {
  const { moduleID } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await ModuleService.getModuleTasks(Number(moduleID));
        setTasks(res.data || []);
      } catch (err) {
        setError("Failed to fetch tasks");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    if (moduleID) fetchTasks();
  }, [moduleID]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <FaTasks className="text-slate-700" /> Module Tasks
        </h2>
        <Link
          href={`/mentor/module/${moduleID}/discussion`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition text-sm font-semibold mt-4 sm:mt-0"
        >
          Go to Discussion
        </Link>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Task Title
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Deadline
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  Loading tasks...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-red-500">
                  {error}
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  No tasks in this module.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 align-middle font-medium text-slate-800">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 align-middle flex gap-2 justify-end">
                    <Link
                      href={`/mentor/module/${moduleID}/task/${task.id}`}
                      className="inline-flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded shadow hover:bg-slate-700 transition text-xs font-semibold"
                    >
                      <FaEye /> View Submissions
                    </Link>
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

export default MentorModuleTasksPage;
