"use client";

import Login from "@/components/Login";

const MentorLogin = () => {
  return (
    <Login
      redirectUrl="/mentor/module"
      heading="Login As a Mentor"
      signupUrl="/mentor/signup"
    />
  );
};

export default MentorLogin;
