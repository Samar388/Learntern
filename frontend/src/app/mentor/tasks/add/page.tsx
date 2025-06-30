"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FaPlus, FaTasks, FaBook, FaComments } from "react-icons/fa";
import ModuleService from "@/services/ModuleService";
import TaskService from "@/services/TaskService";

type Module = {
  id: number;
  title: string;
  mentor: {
    full_name: string;
  };
};

const AddTaskPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    issued_date: new Date().toISOString().slice(0, 10),
    deadline: "",
    module_id: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingModules, setLoadingModules] = useState(true);

  useEffect(() => {
    ModuleService.getEnrolledModulesMentor()
      .then((res) => {
        setModules(res.data || []);
      })
      .catch(() => setModules([]))
      .finally(() => setLoadingModules(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    const { title, description, issued_date, deadline, module_id } = form;
    if (!module_id) {
      setError("Please select a module.");
      setSubmitting(false);
      return;
    }
    const payload = { title, description, issued_date, deadline };
    try {
      await TaskService.createTask(payload, Number(module_id));
      setSuccess("Task added successfully!");
      setForm({
        title: "",
        description: "",
        issued_date: new Date().toISOString().slice(0, 10),
        deadline: "",
        module_id: "",
      });
    } catch (err: any) {
      setError(err?.message || "Failed to add task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-12 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <Input
              label="Title"
              name="title"
              type="text"
              className="text-sm shadow focus:shadow-lg border-none focus:ring-2 focus:ring-slate-200"
              value={form.title}
              onChange={handleChange}
            />
            <div className="flex flex-col">
              <label className="text-[#222823] text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="shadow focus:shadow-lg border-none focus:ring-2 focus:ring-slate-200 rounded-md p-2 min-h-[80px] text-sm bg-gray-50"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Issued Date"
              name="issued_date"
              type="date"
              className="text-sm shadow border-none focus:shadow-lg focus:ring-2 focus:ring-slate-200"
              value={form.issued_date}
              onChange={handleChange}
              disabled
            />
            <Input
              label="Deadline"
              name="deadline"
              type="date"
              className="text-sm shadow border-none focus:shadow-lg focus:ring-2 focus:ring-slate-200"
              value={form.deadline}
              onChange={handleChange}
            />
            <div className="flex flex-col">
              <label className="text-[#222823] text-sm font-medium mb-1">Module</label>
              <select
                name="module_id"
                className="shadow focus:shadow-lg border-none focus:ring-2 focus:ring-slate-200 rounded-md p-2 text-sm bg-gray-50"
                value={form.module_id}
                onChange={handleChange}
                required
                disabled={loadingModules}
              >
                <option value="" disabled>
                  {loadingModules ? "Loading modules..." : "Select a module"}
                </option>
                {modules.map((mod) => (
                  <option key={mod.id} value={mod.id} className="text-sm">
                    {mod.title}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <Button
              type="submit"
              className="text-sm shadow focus:shadow-lg border-none focus:ring-2 focus:ring-slate-200"
              value={submitting ? "Adding..." : "Add Task"}
              disabled={submitting}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTaskPage;
