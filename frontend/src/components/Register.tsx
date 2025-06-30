"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { SignupErrors } from "@/interfaces/SignupErrors";
import { SignupForm } from "@/interfaces/SignupForm";
import AuthService from "@/services/AuthService";
import { validateForm } from "@/services/FormValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const initialForm: SignupForm = {
  full_name: "",
  email: "",
  phonenumber: "",
  avatar: null,
  password: "",
  confirmpassword: "",
};

const Register = ({ role }: { role: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupForm>(initialForm);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupInput = [
    {
      label: "Full Name",
      name: "full_name",
      type: "text",
      className: "p-2",
      value: formData.full_name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      className: "p-2",
      value: formData.email,
    },
    {
      label: "Phone Number",
      name: "phonenumber",
      type: "tel",
      className: "p-2",
      value: formData.phonenumber,
    },
    {
      label: "Avatar",
      name: "avatar",
      type: "file",
      className: "p-2",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      className: "p-2",
      value: formData.password,
    },
    {
      label: "Confirm Password",
      name: "confirmpassword",
      type: "password",
      className: "p-2",
      value: formData.confirmpassword,
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" && files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const form = new FormData();

      form.append("full_name", formData.full_name);
      form.append("email", formData.email);
      form.append("phone_number", formData.phonenumber);
      form.append("password", formData.password);
      form.append("password_confirmation", formData.confirmpassword);
      form.append("role", role);

      if (formData.avatar) form.append("avatar", formData.avatar);

      await AuthService.register(form);

      router.push("/verify-email");
    } catch (err: any) {
      setApiError(
        err?.message ||
          err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center min-h-screen items-center overflow-hidden">
      <Logo className="w-26" />
      <h1 className="text-3xl font-semibold">Sign Up Page</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-xl"
        encType="multipart/form-data"
      >
        <div className="flex flex-col w-96 text-sm justify-between space-y-3">
          {signupInput.map((input) => (
            <div key={input.name} className="flex flex-col">
              <Input
                label={input.label}
                name={input.name}
                type={input.type}
                className={input.className}
                onChange={handleChange}
                value={input.type === "file" ? undefined : input.value}
              />
              {errors[input.name] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[input.name]}
                </span>
              )}
            </div>
          ))}
          {apiError && <span className="text-red-500 text-xs">{apiError}</span>}
          {success && <span className="text-green-600 text-xs">{success}</span>}
          <Button
            type="submit"
            className="p-2"
            value={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
          />
        </div>
      </form>
      <span className="text-xs">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Register;
