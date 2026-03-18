import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/toaster";
import { useResendOtp, useVerifyOtp } from "@/services/auth.service";

const otpSchema = z.object({
  otp: z.string().min(6, "Enter the 6-digit code").max(6, "Enter the 6-digit code"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpVerify() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get("emailToken") || "";

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  const onSubmit = (data: OtpFormValues) => {
    if (!token) {
      toast({
        variant: "error",
        title: "Invalid link",
        description: "Missing reset token.",
      });
      return;
    }

    verifyOtp(
      { token, otp: data.otp },
      {
        onSuccess: () => {
          toast({
            title: "OTP Verified",
            description: "You can now reset your password.",
          });
          navigate(`/reset-password/${token}`);
        },
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : "Failed to verify OTP";
          toast({
            variant: "error",
            title: "Error",
            description: errorMessage,
          });
        },
      }
    );
  };

  const handleResend = () => {
    if (!emailToken) {
      toast({
        variant: "error",
        title: "Missing email token",
        description: "Please restart the forgot password flow.",
      });
      return;
    }

    resendOtp(emailToken, {
      onSuccess: (res) => {
        toast({
          title: "OTP Sent",
          description: "Check your email for the new OTP.",
        });
        const nextToken = res.data || token;
        if (nextToken && nextToken !== token) {
          navigate(`/otp-verify/${nextToken}?emailToken=${encodeURIComponent(emailToken)}`);
        }
      },
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to resend OTP";
        toast({
          variant: "error",
          title: "Error",
          description: errorMessage,
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">OTP Verification</h1>
          <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">Verification code</p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setValue("otp", value, { shouldValidate: true })}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {errors.otp && <p className="text-sm text-destructive text-center">{errors.otp.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button type="button" variant="outline" className="w-full" onClick={handleResend} disabled={isResending}>
                {isResending ? "Sending..." : "Resend OTP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
