"use client";

import Login from "@/components/Login";

const InternLogin = () => {
  return (
    <Login
      redirectUrl="/intern/module/all"
      heading="Login As a Intern"
      signupUrl="/intern/signup"
    />
  );
};

export default InternLogin;
