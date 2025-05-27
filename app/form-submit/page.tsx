// app/thank-you/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <main className="h-[80vh] bg-[#f4f2ee] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <CheckCircle className="mx-auto mb-4 w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Cảm ơn bạn hoàn tất thủ tục!
        </h2>
        <p className="text-gray-600 mb-6">
          Đội ngũ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <Button asChild variant="default">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Về trang chủ
          </Link>
        </Button>
      </div>
    </main>
  );
}
