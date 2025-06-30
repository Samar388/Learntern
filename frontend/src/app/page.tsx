"use client";

import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";

const roles = [
  { name: "Mentor", href: "/mentor/login" },
  { name: "Admin", href: "/admin/login" },
  { name: "Intern", href: "/intern/login" },
];

const Home = () => {
  const [draggedRole, setDraggedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 py-10 bg-white border-b border-gray-200 shadow-sm text-sm h-14">
        <div className="flex items-center">
          <Logo className="w-24" />
        </div>
        <div className="flex gap-6  items-center">
          <Link
            href="/"
            className="text-gray-800 font-semibold hover:text-slate-800 transition"
          >
            Home
          </Link>
          <a
            href="#about"
            className="text-gray-800 font-semibold hover:text-slate-800 transition"
          >
            About
          </a>
          <div className="relative group">
            <span className="text-gray-800 font-semibold cursor-pointer hover:text-slate-800 transition">
              Signup
            </span>
            <div className="absolute right-6 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {roles.map((role) => (
                <Link
                  key={role.name}
                  href={`${role.name.toLowerCase()}/signup`}
                  draggable
                  onDragStart={() => setDraggedRole(role.name)}
                  onDragEnd={() => setDraggedRole(null)}
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ${
                    draggedRole === role.name ? "bg-slate-200" : ""
                  }`}
                >
                  Signup as {role.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-56px)] px-4 py-12 bg-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 text-center">
          Learntern: Learning Management Platform
        </h1>
        <p className="text-base text-gray-700 max-w-2xl text-center mb-6">
          A simple, modern LMS for small organizations. Mentors can create
          modules and tasks, assign them to interns, and interns can submit
          their work for feedback and review.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {roles.map((role) => (
            <Link
              key={role.name}
              href={role.href}
              className="bg-slate-800 text-white px-5 py-2 rounded-lg shadow hover:bg-slate-700 transition text-sm font-semibold"
              draggable
              onDragStart={() => setDraggedRole(role.name)}
              onDragEnd={() => setDraggedRole(null)}
            >
              Login as {role.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              How Learntern Works
            </h2>
            <ul className="list-disc pl-6 text-gray-700 text-base space-y-2">
              <li>
                <span className="font-semibold text-slate-800">Mentors</span>{" "}
                Add and tasks and review submissions.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Interns</span>{" "}
                View assigned modules, complete tasks, and submit their work for
                feedback.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Admins</span>{" "}
                Manage modules and assigns mentors and interns to modules.
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-4 items-center">
            <Logo className="w-48" />
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-1">
                  1
                </span>
                <span className="text-xs text-gray-700 text-center">
                  Mentor creates module & task
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-1">
                  2
                </span>
                <span className="text-xs text-gray-700 text-center">
                  Intern submits work
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-1">
                  3
                </span>
                <span className="text-xs text-gray-700 text-center">
                  Mentor reviews & gives feedback
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            About Learntern
          </h2>
          <p className="text-gray-700 text-base mb-2">
            Learntern is designed for small organizations to manage learning,
            mentoring, and task submissions with ease. Mentors can create
            modules and tasks, assign them to interns, and provide feedback on
            submissions. Interns can view their assigned modules, complete
            tasks, and track their progress.
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>Mentors create modules and tasks</li>
            <li>Interns submit their work for review</li>
            <li>Admins manage users and oversee progress</li>
            <li>Simple, clean, and modern interface</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
