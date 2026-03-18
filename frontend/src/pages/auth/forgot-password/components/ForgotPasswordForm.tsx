import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toaster";
import { useForgotPassword } from "@/services/auth.service";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data.email, {
      onSuccess: (res) => {
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
        });
        navigate(`/otp-verify/${res.data.resetToken}?emailToken=${encodeURIComponent(res.data.emailToken)}`);
      },
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to send OTP";
        toast({
          variant: "error",
          title: "Error",
          description: errorMessage,
        });
      },
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
