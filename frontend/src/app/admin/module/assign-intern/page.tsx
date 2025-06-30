"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ModuleService from "@/services/ModuleService";

const AssignInternPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [selectedModule, setSelectedModule] = useState("");
  const [emails, setEmails] = useState([""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setLoadingModules(true);

      try {
        const res = await ModuleService.readModule();
        setModules(res.data || []);
      } catch (err) {
        setError("Failed to fetch modules");
        setModules([]);
      } finally {
        setLoadingModules(false);
      }
    };
    fetchModules();
  }, []);

  const handleEmailChange = (id: number, value: string) => {
    setEmails((prev) => prev.map((email, i) => (i === id ? value : email)));
  };

  const handleAddEmail = () => {
    setEmails((prev) => [...prev, ""]);
  };

  const handleRemoveEmail = (id: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!selectedModule) {
      setError("Please select a module.");
      setSubmitting(false);
      return;
    }
    const filteredEmails = emails.map((e) => e.trim()).filter((e) => e);

    if (filteredEmails.length === 0) {
      setError("Please enter at least one intern email.");
      setSubmitting(false);
      return;
    }
    try {
      await ModuleService.assignIntern(filteredEmails, Number(selectedModule));

      setSuccess("Intern(s) assigned successfully!");
      setEmails([""]);
      setSelectedModule("");
    } catch (err: any) {
      setError(err?.message || "Failed to assign intern(s)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Assign Interns to Module
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col">
            <label className="text-[#222823] text-sm mb-1">Select Module</label>
            <select
              name="module"
              className="border-[1.5px] border-[#a7a2a9] focus:border-[#8c8c8c] rounded-md p-2 text-sm"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              required
              disabled={loadingModules}
            >
              <option value="" disabled>
                {loadingModules ? "Loading modules..." : "Select a module"}
              </option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#222823] text-sm mb-1">
              Intern Email(s)
            </label>
            {emails.map((email, id) => (
              <div key={id} className="flex gap-2 items-center">
                <Input
                  label=""
                  name={`email-${id}`}
                  type="email"
                  className="text-sm flex-1 shadow-md focus:shadow-lg border-[1.5px] border-[#a7a2a9] focus:border-[#8c8c8c] rounded-md p-2 transition-all"
                  value={email}
                  onChange={(e) => handleEmailChange(id, e.target.value)}
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded border border-transparent hover:border-red-300 bg-white shadow-sm transition"
                    onClick={() => handleRemoveEmail(id)}
                    title="Remove"
                  >
                    &minus;
                  </button>
                )}
                {id === emails.length - 1 && (
                  <button
                    type="button"
                    className="text-slate-800 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-1 border border-gray-300 shadow-sm transition"
                    onClick={handleAddEmail}
                    title="Add another email"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-600 text-xs">{success}</div>}
          <Button
            type="submit"
            className="text-sm"
            value={submitting ? "Assigning..." : "Assign Intern(s)"}
            disabled={submitting}
          />
        </form>
      </div>
    </div>
  );
};

export default AssignInternPage;
