"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import ModuleService from "@/services/ModuleService";

type Task = {
  id: number;
  title: string;
  description: string;
  issued_date: string;
  module_title: string;
  discussion_id: string;
  deadline: string;
  created_at: string;
  updated_at: string;
  is_submitted: boolean;
};

const ModuleDetail = () => {
  const params = useParams();
  const id = params?.id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    ModuleService.getModuleTasks(Number(id))
      .then((res) => {
        setTasks(res.data || []);
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      
      <main className="flex-1 p-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {tasks[0]?.module_title} Tasks
          </h2>
          <Link
            href={`/intern/module/${id}/discussion`}
            className="bg-black hover:bg-gray-800 text-white px-5 text-sm py-2 rounded-lg shadow transition"
          >
            Go to Discussion
          </Link>
        </div>
        <div className="bg-white rounded-2xl text-sm shadow-2xl p-8 border border-gray-100">
          {loading ? (
            <div>Loading tasks...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <table className="w-full text-left text-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  <th className="py-3 px-5 font-semibold">Task</th>
                  <th className="py-3 px-5 font-semibold">Issued Date</th>
                  <th className="py-3 px-5 font-semibold">Deadline</th>
                  <th className="py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr
                    key={task.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200/40 transition`}
                  >
                    <td className="py-3 px-5 font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="py-3 px-5 text-gray-700">
                      {task.issued_date.split(" ")[0]}
                    </td>
                    <td className="py-3 px-5 text-gray-700">
                      {new Date(task.deadline).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex gap-2 justify-end items-center">
                        {task.is_submitted ? (
                          <>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold flex items-center h-full self-center">
                              Submitted
                            </span>
                            <Link
                              href={`/intern/module/${id}/task/${task.id}/submission`}
                              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition text-xs"
                            >
                              View Submission
                            </Link>
                          </>
                        ) : (
                          <Link
                            href={`/intern/module/${id}/task/${task.id}`}
                            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition text-xs"
                            style={{ minWidth: "120px", textAlign: "center" }}
                          >
                            View Task
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModuleDetail;
