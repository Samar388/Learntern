"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ModuleService from "@/services/ModuleService";

const CreateModulePage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    isDiscussion: "no",
    mentorEmail: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const moduleData = {
        title: form.title,
        isDiscussion: form.isDiscussion === "yes",
        mentor_email: form.mentorEmail,
      };
      await ModuleService.createModule(moduleData);

      setSuccess("Module created successfully!");

      router.push("/admin/module");
    } catch (err: any) {
      setError(err?.message || "Failed to create module");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Create Module
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <Input
            label="Title"
            name="title"
            type="text"
            className="text-sm"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            label="Assign Mentor (Email)"
            name="mentorEmail"
            type="email"
            className="text-sm"
            value={form.mentorEmail}
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <label className="text-[#222823] text-sm mb-1">
              Enable Discussion?
            </label>
            <select
              name="isDiscussion"
              className="border-[1.5px] border-[#a7a2a9] focus:border-[#8c8c8c] rounded-md p-2 text-sm"
              value={form.isDiscussion}
              onChange={handleChange}
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-600 text-xs">{success}</div>}
          <Button
            type="submit"
            className="text-sm"
            value={submitting ? "Creating..." : "Create Module"}
            disabled={submitting}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateModulePage;
