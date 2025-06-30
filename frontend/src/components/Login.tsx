"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Login = ({
  heading,
  redirectUrl = "",
  signupUrl = "/signup",
  forgotPasswordUrl = "/forgotpassword",
}: LoginProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await AuthService.login(formData.email, formData.password).then(() => {
        router.push(redirectUrl);
      });
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center min-h-screen items-center">
      <Logo className="w-26" />
      <h1 className="text-3xl font-semibold ">{heading}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-xl">
        <div className="flex flex-col w-96 text-sm justify-between space-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            className="p-2"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            className="p-2"
            value={formData.password}
            onChange={handleChange}
          />
          <Link href={forgotPasswordUrl} className="text-xs underline">
            Forgot password?
          </Link>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <Button
            type="submit"
            className="p-2"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
          />
        </div>
      </form>
      <span className="text-xs">
        Don't have an account?{" "}
        <Link href={signupUrl} className="underline">
          Signup
        </Link>
      </span>
    </div>
  );
};

export default Login;
