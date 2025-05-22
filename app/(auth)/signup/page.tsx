"use client";

import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(50, { message: "Tối đa 50 ký tự" })
    .min(2, { message: "Chứa ít nhất 2 ký tự" }),
  lastName: z
    .string()
    .trim()
    .max(50, { message: "Tối đa 50 ký tự" })
    .min(2, { message: "Chứa ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Vui lòng nhập email hợp lệ" }).trim(),
  password: z
    .string()
    .min(8, { message: "Chứa ít nhất 8 ký tự" })
    .regex(/[a-zA-Z]/, { message: "Chứa ít nhất 1 chữ" })
    .regex(/[0-9]/, { message: "Chứa ít nhất một số" })
    .trim(),
});

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Đăng ký thất bại");
        return;
      }

      router.push("/signin");
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
          className="space-y-6 bg-white px-6 py-5 rounded-2xl w-[400px] shadow-2xl"
        >
          <div className="grid grid-cols-2 space-x-4">
            <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>first name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>last name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            sign up
          </Button>
          <Separator />
          <div className="flex justify-center">
            <span className="text-gray-500">Already on Find Job?</span>
            <Link
              href="/signin"
              className="ml-2 hover:underline text-blue-500 font-semibold"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
