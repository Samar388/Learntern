"use client";

import React, { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";
import { useParams, useRouter } from "next/navigation";

const SubmissionPage = () => {
  const router = useRouter();
  const { taskID, id } = useParams();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchSubmission = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await TaskService.getSubmittedTask(Number(taskID));
        if (Array.isArray(data) && data.length > 0) {
          setSubmission(data[0]);
        } else if (
          data &&
          data.data &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setSubmission(data.data[0]);
        } else if (data) {
          setSubmission(data);
        } else {
          setSubmission(null);
        }
      } catch (err: any) {
        setError("Failed to load submission");
      } finally {
        setLoading(false);
      }
    };
    if (taskID) fetchSubmission();
  }, [taskID]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!submission)
    return (
      <div className="text-gray-500 text-center mt-8">No submission found.</div>
    );

  const isDelayed = submission.status === "Delayed";
  const isSubmitted = submission.status === "Submitted";
  const feedback = submission.submission_feedback;

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full max-w-xl mx-auto">
          <button
            onClick={() => router.push(`/intern/module/${id}`)}
            className="flex cursor-pointer items-center gap-2 text-xs text-gray-700 hover:text-black mb-4 font-medium"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Module
          </button>
          <div className="bg-white shadow-2xl rounded-2xl p-10 mt-4 transition-all duration-300">
            <div className="flex items-center mb-8">
              <img
                src={submission.user.avatar}
                alt={submission.user.full_name}
                className="w-16 h-16 rounded-full object-cover shadow-md mr-5 border-2 border-white"
              />
              <div>
                <div className="font-semibold text-base text-gray-900">
                  {submission.user.full_name}
                </div>
                <div className="text-gray-500 text-xs">
                  {submission.user.email}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Description
              </label>
              <textarea
                className="w-full border-none rounded-lg px-4 py-3 bg-gray-100 text-gray-800 resize-none shadow-inner focus:outline-none text-xs"
                value={submission.description}
                readOnly
                rows={3}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Submitted File/Link
              </label>
              {submission.file_path ? (
                <div className="w-full flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-4 shadow">
                  <a
                    href={submission.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all hover:text-blue-800 text-xs font-medium"
                  >
                    View Full PDF
                  </a>
                  <a
                    href={submission.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-gray-800 underline break-all hover:text-gray-900 text-xs"
                  >
                    Download PDF
                  </a>
                </div>
              ) : submission.link ? (
                <a
                  href={submission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all hover:text-blue-800 text-xs font-medium"
                >
                  {submission.link}
                </a>
              ) : (
                <span className="text-gray-400 text-xs">
                  No file or link submitted.
                </span>
              )}
            </div>
            <div className="mb-6 flex items-center gap-4">
              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold shadow ${
                  isDelayed
                    ? "bg-red-100 text-red-600"
                    : isSubmitted
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {submission.status}
              </span>
              <span
                className={
                  isDelayed ? "text-red-500 text-xs" : "text-green-700 text-xs"
                }
              >
                Submitted at: {submission.submitted_at}
              </span>
            </div>
            <div className="mb-2">
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Mentor Feedback
              </label>
              {feedback ? (
                <div className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-gray-900">
                      {feedback.status === "Approved"
                        ? "Graded"
                        : feedback.status}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      Score: {feedback.score ?? "Not graded"}
                    </span>
                  </div>
                  <div className="text-gray-800 text-xs mb-1">
                    {feedback.comment}
                  </div>
                </div>
              ) : (
                <span className="text-gray-400 text-xs">
                  No mentor feedback yet.
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubmissionPage;
