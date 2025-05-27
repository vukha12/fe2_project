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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const formSchema = z.object({
  job_title: z
    .string()
    .min(2, "Tên công ty quá ngắn")
    .max(100, "Tên công ty quá dài"),
  company: z.string().max(100, "Tên công ty quá dài").trim(),
  province: z.string().trim(),
  district: z.string().trim(),
  skill: z.string().max(100, "Kỹ năng quá dài").trim(),
  experience: z.string().max(30, "Kinh nghiệm quá dài").trim(),
  description: z.string().max(1000, "Mô tả quá dài").trim(),
  salary: z.string().max(50, "Tối đa 50 ký tự").trim(),
  interest: z.string().max(1000, "Mô tả quá dài").trim(),
  job_type: z.string().trim(),
});

import {
  fetchDistricts,
  fetchExperience,
  fetchJobTypes,
  fetchSkills,
  fetchProvinces,
} from "@/lib/api";

type Type = {
  code: number;
  name: string;
};
export default function form() {
  const [provinces, setProvinces] = useState<Type[]>([]);
  const [skills, setSkill] = useState<Type[]>([]);
  const [districts, setDistricts] = useState<Type[]>([]);
  const [jobtypes, setJobtypes] = useState<Type[]>([]);
  const [experience, setExperience] = useState<Type[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      company: "",
      province: "",
      district: "",
      job_type: "",
      skill: "",
      experience: "",
      salary: "",
      description: "",
      interest: "",
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
    fetchProvinces()
      .then((data) => {
        setProvinces(data);
        form.setValue("province", "");
      })
      .catch((err) => console.error("Lỗi khi tải job_types:", err));
    fetchJobTypes()
      .then((data) => {
        setJobtypes(data);
        form.setValue("job_type", "");
      })
      .catch((err) => console.error("Lỗi khi tải job_types:", err));
  }, [watchProvince]);

  // useEffect(() => {
  //   fetchProvinces()
  //     .then((data) => {
  //       setProvinces(data);
  //       form.setValue("province", "");
  //     })
  //     .catch((err) => console.error("Lỗi khi tải job_types:", err));
  // }, []);

  // useEffect(() => {
  //   fetchJobTypes()
  //     .then((data) => {
  //       setJobtypes(data);
  //       form.setValue("job_type", "");
  //     })
  //     .catch((err) => console.error("Lỗi khi tải job_types:", err));
  // }, []);

  useEffect(() => {
    fetchExperience()
      .then((data) => {
        setExperience(data);
        form.setValue("experience", "");
      })
      .catch((err) => console.error("Lỗi khi tải job_types:", err));
  }, []);

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        setSkill(data);
        form.setValue("skill", "");
      })
      .catch((err) => console.error("Lỗi khi tải job_types:", err));
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi tạo công việc");
      }

      const data = await response.json();
      toast.success("Công việc đã được đăng thành công!");
      router.push(`/`);
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi tạo công việc:", error);
      setError("Đã xảy ra lỗi khi tạo công việc. Vui lòng thử lại sau.");
      toast.error("Đã xảy ra lỗi khi tạo công việc. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-5 rounded-2xl shadow hover:shadow-2xs"
        >
          <div className="flex justify-start font-bold text-xl">
            <span>Chi tiết công việc</span>
          </div>
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề công việc</FormLabel>
                <FormControl>
                  <Input placeholder="job_title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên công ty</FormLabel>
                <FormControl>
                  <Input placeholder="company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
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
                          {provinces.map((item) => (
                            <SelectItem
                              key={item.code}
                              value={String(item.code)}
                            >
                              {item.name}
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại công việc</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="job types" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {jobtypes.map((jobtype) => (
                            <SelectItem
                              key={jobtype.code}
                              value={String(jobtype.code)}
                            >
                              {jobtype.name}
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

          <div className="flex space-x-8 items-center justify-between">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kỹ năng</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="job types" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {skills.map((jobtype) => (
                            <SelectItem
                              key={jobtype.code}
                              value={String(jobtype.code)}
                            >
                              {jobtype.name}
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
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kinh nghiệm</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {experience.map((item) => (
                            <SelectItem
                              key={item.code}
                              value={String(item.code)}
                            >
                              {item.name}
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
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mức lương</FormLabel>
                  <FormControl>
                    <Input placeholder="salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả công việc</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quyền lợi</FormLabel>
                <FormControl>
                  <Textarea placeholder="interest" {...field} />
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
