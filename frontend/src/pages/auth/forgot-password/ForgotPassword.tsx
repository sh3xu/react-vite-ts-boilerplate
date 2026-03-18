import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
