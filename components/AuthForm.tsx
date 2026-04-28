"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email("Please enter a valid email"),
    fullName:
      formType === "sign-up"
        ? z.string().min(2, "Full name must be at least 2 characters").max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>

        {type === "sign-up" && (
          <div className="space-y-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <Input
                placeholder="Enter your full name"
                className="h-11 rounded-xl border-slate-300 px-3"
                {...register("fullName")}
              />
            </div>

            {errors.fullName && (
              <p className="text-sm text-red-500">
                {errors.fullName.message as string}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>

            <Input
              placeholder="Enter your email"
              className="h-11 rounded-xl border-slate-300 px-3"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-[#FA7275] text-base font-semibold text-white hover:bg-[#f76064]"
          disabled={isLoading}
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}

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

        {errorMessage && <p className="text-sm text-red-500">*{errorMessage}</p>}

        <div className="flex justify-center text-sm text-slate-600">
          <p>
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="ml-1 font-semibold text-[#FA7275] hover:underline"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </form>

      {accountId && <OtpModal email={getValues("email")} accountId={accountId} />}
    </>
  );
};

export default AuthForm;