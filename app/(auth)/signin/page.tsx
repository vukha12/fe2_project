"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  email: z.string({ message: "Vui lòng nhập email" }).email().trim(),
  password: z
    .string({ message: "Vui lòng nhập password" })
    .min(1, { message: "Vui lòng nhập mật khẩu" }),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại");
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white px-4 py-5 rounded-2xl w-[400px] shadow-2xl"
        >
          <h1 className="text-4xl font-semibold font-stretch-normal text-neutral-600">
            Sgin in
          </h1>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full cursor-pointer bg-blue-600 text-white text-1xl hover:bg-blue-700"
          >
            sign in
          </Button>
        </form>
      </Form>
      <div className="py-2 mt-6 text-1xl">
        <span>New to Find Job?</span>
        <Link
          href="/signup"
          className="ml-2 hover:underline text-blue-500 font-semibold"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
