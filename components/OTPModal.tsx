"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) router.push("/");
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The code you entered is invalid. Please try again.",
        variant: "destructive",
      });
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
    toast({
      title: "OTP Resent",
      description: `A new code has been sent to ${email}`,
      variant: "success",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[580px] rounded-[30px] bg-white p-8 md:p-14 shadow-drop-3 animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-light-400/50 transition-all"
        >
          <Image
            src="/assets/icons/close-dark.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-[28px] md:text-[34px] font-bold text-light-100 mb-2">
            Enter Your OTP
          </h2>
          <p className="text-[16px] md:text-[18px] font-medium text-light-200 mb-10 max-w-[400px]">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="text-[#FA7275] font-semibold">{email}</span>
          </p>

          <InputOTP
            maxLength={6}
            value={password}
            onChange={setPassword}
            className="w-full"
          >
            <InputOTPGroup className="flex w-full justify-between gap-2 md:gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="size-12 md:size-16 text-[24px] md:text-[32px] font-bold rounded-xl border-2 border-light-300 flex items-center justify-center text-[#FA7275] shadow-drop-1 outline-none focus:ring-2 focus:ring-[#FA7275] focus:ring-offset-2 transition-all"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <div className="flex w-full flex-col gap-5 mt-12">
            <Button
              onClick={handleSubmit}
              disabled={password.length !== 6 || isLoading}
              className="h-14 w-full rounded-full bg-[#FA7275] text-lg font-semibold text-white shadow-drop-2 transition-all hover:bg-[#f76064] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              Verify & Proceed
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin brightness-0 invert"
                />
              )}
            </Button>

            <div className="flex items-center justify-center text-sm md:text-base font-semibold text-light-100">
              <p>Didn&apos;t receive the code?</p>
              <button
                onClick={handleResendOtp}
                className="ml-2 text-[#FA7275] hover:underline transition-all"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
