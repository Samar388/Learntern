import Logo from "@/components/Logo";

const VerifyEmailPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <Logo className="w-32 mb-6" />
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-200 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        Verify Your Email
      </h1>
      <p className="text-gray-700 text-center mb-2">
        A verification link has been sent to your email address.
      </p>
      <p className="text-gray-700 text-center mb-4">
        Please check your inbox or spam folder to complete your registration.
      </p>
    </div>
  </div>
);

export default VerifyEmailPage;
