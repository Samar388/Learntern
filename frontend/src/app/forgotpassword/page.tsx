"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await AuthService.forgotPassword(email);
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center min-h-screen items-center">
      <Logo className="w-26" />
      <h1 className="text-3xl font-semibold">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-xl">
        <div className="flex flex-col w-96 text-sm justify-between space-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            className="p-2"
            value={email}
            onChange={handleChange}
          />
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-500 text-xs">{success}</div>}
          <Button
            type="submit"
            className="p-2"
            value={loading ? "Sending..." : "Send Reset Email"}
            disabled={loading}
          />
          <Link href="/login" className="text-xs underline">
            Back to Login
          </Link>
        </div>
      </form>
      <span className="text-xs">
        Don't have an account?{" "}
        <Link href="/signup" className="underline">
          Signup
        </Link>
      </span>
    </div>
  );
};

export default ForgotPassword;
