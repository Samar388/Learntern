"use client";

import Sidebar from "@/components/Sidebar";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModuleService from "@/services/ModuleService";
import TaskService from "@/services/TaskService";
import Button from "@/components/Button";

const Page = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const formData = new FormData();
    formData.append("description", description);
    if (file) formData.append("file", file);
    if (link) formData.append("link", link);
    try {
      await TaskService.submitTask(formData, Number(taskID));
      setDescription("");
      setFile(null);
      setLink("");
    } catch (error: any) {
      setSubmitError(error?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const params = useParams();
  const { taskID } = params as { taskID: string };
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await ModuleService.getModuleTask(Number(taskID));
        setTask(data.data);
      } catch (error) {
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskID]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <main className="flex-1 p-12">
        <section className="max-w-2xl mx-auto">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : task ? (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-900">
                {task.title}
              </h1>
              <p className="text-gray-600 mb-8 text-sm">{task.description}</p>
              <div className="mb-4 text-xs text-gray-500">
                <span>
                  Issued:{" "}
                  {task.issued_date
                    ? new Date(task.issued_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
                <span className="ml-4">
                  Deadline:{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-8 mt-8 flex flex-col gap-6 shadow border border-gray-200"
              >
                <label className="text-gray-700 font-medium flex flex-col gap-2 text-sm">
                  Description
                  <textarea
                    className="w-full p-3 rounded border border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-gray-800 resize-none text-sm"
                    rows={3}
                    placeholder="Describe your submission..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </label>
                <label className="text-gray-700 font-medium flex flex-col gap-2 text-sm">
                  File Upload
                  <input
                    name="file"
                    type="file"
                    className="w-full p-3 rounded border border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-gray-800 text-sm"
                    onChange={handleFileChange}
                  />
                </label>
                <label className="text-gray-700 font-medium flex flex-col gap-2 text-sm">
                  Link (optional)
                  <input
                    name="link"
                    type="url"
                    className="w-full p-3 rounded border border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-gray-800 text-sm"
                    placeholder="Paste your link here"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </label>
                <Button
                  type="submit"
                  value="Submit Task"
                  disabled={submitting}
                  className=""
                />
                {submitError && (
                  <div className="text-red-500 text-sm mt-2">{submitError}</div>
                )}
              </form>
            </>
          ) : (
            <div className="text-red-500">Task not found.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Page;
