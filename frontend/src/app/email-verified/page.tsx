import Logo from "@/components/Logo";
import Link from "next/link";

const EmailVerifiedPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <Logo className="w-32 mb-6" />
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-200 flex flex-col items-center">
      <svg
        className="w-16 h-16 text-black mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 12l3 3 5-5"
        />
      </svg>
      <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        Your Email is Verified!
      </h1>
      <p className="text-gray-700 text-center mb-4">
        You can now login to your account.
      </p>
      <div className="flex gap-3 mt-2 w-full">
        <Link
          href="/mentor/login"
          className="flex-1 text-center bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition text-sm font-semibold"
        >
          Login as Mentor
        </Link>
        <Link
          href="/admin/login"
          className="flex-1 text-center bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition text-sm font-semibold"
        >
          Login as Admin
        </Link>
        <Link
          href="/intern/login"
          className="flex-1 text-center bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition text-sm font-semibold"
        >
          Login as Intern
        </Link>
      </div>
    </div>
  </div>
);

export default EmailVerifiedPage;
