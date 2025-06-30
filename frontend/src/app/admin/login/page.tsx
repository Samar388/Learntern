"use client";

import Login from "@/components/Login";

const AdminLogin = () => {
  return (
    <Login
      redirectUrl="/admin/module"
      heading="Login As a Admin"
      signupUrl="/admin/signup"
    />
  );
};

export default AdminLogin;
