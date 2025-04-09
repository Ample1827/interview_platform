"use client"

import { z } from "zod"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowUpRightFromSquare } from "lucide-react";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    passowrd: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap=5 card py-14 px-10">
        <div className="flex flex-row gap-3 justify-center">
          <img src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Smart Interview</h2>
        </div>
        <h3 className="text-center">Practice Job interview with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-6 form">
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            <button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "New to Smart Interview?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
