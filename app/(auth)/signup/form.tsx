"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstname: z.string().trim().min(3, {
    message: "Chưa ít nhất 3 ký tự",
  }),
  lastname: z.string().trim().min(3, {
    message: "Chưa ít nhất 3 ký tự",
  }),
  email: z.string().trim().email({ message: "Email không hợp lệ" }),
  password: z.string().trim().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});
export default function FormSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert(data.message);
      router.push("signin");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-1/4 bg-white shadow-md p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-1">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="firstname" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="lastname" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold text-1xl"
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
