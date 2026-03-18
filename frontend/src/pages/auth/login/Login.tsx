import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "./components/LoginForm";
import { SocialLogin } from "./components/SocialLogin";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <LoginForm />
        <SocialLogin />

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CardContent className="pt-2">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Demo Access</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  To view admin dashboard without authentication, navigate to:{" "}
                  <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-mono text-xs">
                    /admin
                  </code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
