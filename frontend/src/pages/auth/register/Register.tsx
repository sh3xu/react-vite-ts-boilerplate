import { RegisterForm } from "./components/RegisterForm";
import { TermsCheckbox } from "./components/TermsCheckbox";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Sign up to get started</p>
        </div>
        <RegisterForm />
        <TermsCheckbox />
      </div>
    </div>
  );
}
