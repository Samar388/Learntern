"use client";

import React, { useEffect, useState } from "react";
import TaskService from "@/services/TaskService";
import {
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import Link from "next/link";

const MentorTaskSubmissionsPage = () => {
  const { taskID } = useParams();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await TaskService.getSubmittedTasks(Number(taskID));
        if (res && typeof res === "object" && res.success === false) {
          setError(res.message || "No module tasks submitted.");
          setSubmissions([]);
        } else {
          setSubmissions(res || []);
        }
      } catch (err) {
        setError("Failed to fetch submissions");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [taskID]);

  const handleExpand = (id: number, feedbackGiven: boolean) => {
    if (feedbackGiven) return;
    setExpanded(expanded === id ? null : id);
  };

  const handleFeedbackSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    submissionId: number
  ) => {
    e.preventDefault();
    setFeedbackError(null);
    setFeedbackLoading(submissionId);
    const form = e.currentTarget;
    const score = (form.elements.namedItem("score") as HTMLInputElement)?.value;
    const comment = (form.elements.namedItem("comment") as HTMLTextAreaElement)
      ?.value;
    const status = feedbackStatus[submissionId] || "Approved";
    try {
      await TaskService.postFeedback(
        { score: Number(score), comment, status },
        submissionId
      );

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? { ...s, submission_feedback: { score, comment, status } }
            : s
        )
      );
      setExpanded(null);
    } catch (err: any) {
      setFeedbackError("No modules to review");
    } finally {
      setFeedbackLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Task Submissions
      </h2>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : error ? (
        <div className="w-full max-w-3xl flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              No Submissions Found
            </h3>
            <p className="text-gray-500 text-sm">
              There are no submissions for this task yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {Array.isArray(submissions) && submissions.length > 0 ? (
            submissions.map((submission) => {
              const feedbackGiven = !!submission.submission_feedback;
              return (
                <div
                  key={submission.id}
                  className={`bg-white rounded-lg shadow border border-gray-200 transition-all ${
                    expanded === submission.id ? "ring-2 ring-blue-300" : ""
                  }`}
                >
                  <button
                    className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 focus:outline-none gap-4"
                    onClick={() => handleExpand(submission.id, feedbackGiven)}
                    disabled={feedbackGiven}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {submission.user?.avatar ? (
                        <img
                          src={submission.user.avatar}
                          alt={`${submission.user.full_name}'s avatar`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <FaUser className="text-slate-400" />
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-slate-800">
                          {submission.user?.full_name ||
                            `Intern #${submission.user_id}`}
                        </span>
                        <span className="text-xs text-gray-500">
                          {submission.user?.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-gray-400" />
                        {submission.file_path ? (
                          <Link
                            href={submission.file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View File
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-sm">No file</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {submission.submitted_at}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            submission.status === "Delayed"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {submission.status}
                        </span>
                        {feedbackGiven ? (
                          <span className="text-green-600 font-semibold text-xs">
                            Feedback Given
                          </span>
                        ) : expanded === submission.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                    </div>
                  </button>

                  {expanded === submission.id && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      {submission.description && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">
                            Submission Description
                          </h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {submission.description}
                          </p>
                        </div>
                      )}
                      {submission.link ? (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">
                            Link
                          </h4>
                          <a
                            href={submission.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm break-all"
                          >
                            {submission.link}
                          </a>
                        </div>
                      ) : null}
                      {!feedbackGiven ? (
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={(e) =>
                            handleFeedbackSubmit(e, submission.id)
                          }
                        >
                          <label className="text-sm font-medium text-slate-700">
                            Status
                            <select
                              name="status"
                              className="block w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:border-blue-400"
                              value={
                                feedbackStatus[submission.id] || "Approved"
                              }
                              onChange={(e) =>
                                setFeedbackStatus((s) => ({
                                  ...s,
                                  [submission.id]: e.target.value,
                                }))
                              }
                              required
                            >
                              <option value="Approved">Approved</option>
                              <option value="Needs Revision">
                                Needs Revision
                              </option>
                            </select>
                          </label>
                          <label className="text-sm font-medium text-slate-700">
                            Score
                            <input
                              type="number"
                              name="score"
                              min={0}
                              max={100}
                              className="block w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:border-blue-400"
                              placeholder="Enter score (0-100)"
                              required
                            />
                          </label>
                          <label className="text-sm font-medium text-slate-700">
                            Comment
                            <textarea
                              name="comment"
                              className="block w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:border-blue-400 min-h-[100px]"
                              placeholder="Write detailed comment for the intern..."
                              required
                            />
                          </label>
                          {feedbackError && (
                            <div className="text-red-600 text-sm">
                              {feedbackError}
                            </div>
                          )}
                          <div className="flex gap-2 mt-2">
                            <button
                              type="submit"
                              className="bg-slate-800 text-white px-4 py-2 rounded shadow hover:bg-slate-700 transition text-sm font-semibold disabled:opacity-60"
                              disabled={feedbackLoading === submission.id}
                            >
                              {feedbackLoading === submission.id
                                ? "Submitting..."
                                : "Submit Feedback"}
                            </button>
                            <button
                              type="button"
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 transition text-sm font-semibold"
                              onClick={() => setExpanded(null)}
                              disabled={feedbackLoading === submission.id}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="text-green-700 text-sm font-semibold">
                          Feedback already submitted.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-gray-500">No submissions found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorTaskSubmissionsPage;
