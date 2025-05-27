import Form from "./form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  return (
    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-x-4">
      <Form />
      <div className="mt-5">
        <Card className="w-[400px] bg-white border-none">
          <CardDescription className="px-4 tracking-tight">
            <p className="text-1xl text-wrap truncate text-gray-500 font-bold">
              Nhắm mục tiêu công việc của bạn đến đúng người
            </p>
            Bao gồm một mô tả công việc và thêm các kỹ năng cần thiết để nhắm
            mục tiêu những người tìm việc phù hợp với tiêu chí của bạn.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
