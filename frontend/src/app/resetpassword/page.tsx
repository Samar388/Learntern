"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, Suspense, useState } from "react";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (!token || !email) {
        setError("Invalid or missing token/email.");
        return;
      }

      await AuthService.resetPassword(token, email, password, confirmPassword);
      setSuccess("Password has been reset successfully.");
    } catch (err: any) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center min-h-screen items-center">
      <Logo className="w-26" />
      <h1 className="text-3xl font-semibold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-xl">
        <div className="flex flex-col w-96 text-sm justify-between space-y-3">
          <Input
            label="New Password"
            name="password"
            type="password"
            className="p-2"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            className="p-2"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-500 text-xs">{success}</div>}
          <Button
            type="submit"
            className="p-2"
            value={loading ? "Resetting..." : "Reset Password"}
            disabled={loading}
          />
          <Link href="/login" className="text-xs underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

const ResetPassword = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-64">Loading...</div>
    }
  >
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPassword;
