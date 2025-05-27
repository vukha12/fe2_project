"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDistricts } from "@/lib/api";

export const formSchema = z.object({
  company_name: z
    .string()
    .min(2, "Tên công ty quá ngắn")
    .max(100, "Tên công ty quá dài"),
  company_website: z.string().url("Website không hợp lệ"),
  province: z.string(),
  district: z.string(),
  description: z.string().max(1000, "Mô tả quá dài"),
  number_phone: z.string().regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
});

export default function FormSignUp() {
  const [districts, setDistricts] = useState<{ code: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_website: "",
      province: "",
      district: "",
      description: "",
      number_phone: "",
    },
  });

  const watchProvince = form.watch("province");
  useEffect(() => {
    if (watchProvince) {
      fetchDistricts(Number(watchProvince))
        .then((data) => {
          setDistricts(data);
          form.setValue("district", "");
        })
        .catch((err) => console.error("Lỗi khi tải quận:", err));
    }
  }, [watchProvince]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/signup/employer-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      toast.success(data.message || "Hoàn tất thủ tục đăng ký");
      router.push("/form-submit");
    } catch (error: any) {
      toast.error(error.message || "Đã gửi yêu cầu trước đó rồi");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" flex justify-center max-w-2xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-5 rounded-2xl shadow hover:shadow-2xs"
        >
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên công ty</FormLabel>
                <FormControl>
                  <Input placeholder="company name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website công ty</FormLabel>
                <FormControl>
                  <Input placeholder="link url..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-8">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/ Thành Phố</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Tỉnh/thành phố" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectItem value="79">Hồ Chí Minh</SelectItem>
                          <SelectItem value="1">Hà Nội</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/ Huyện</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!districts.length}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="quận/ huyện" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {districts.map((district) => (
                            <SelectItem
                              key={district.code}
                              value={String(district.code)}
                            >
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="number_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại!</FormLabel>
                <FormControl>
                  <Input placeholder="number phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả công ty</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            type="submit"
            className="bg-green-500 w-full hover:bg-green-600 text-white font-semibold text-1xl"
          >
            {loading ? "Signing up..." : "Hoàn tất"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
