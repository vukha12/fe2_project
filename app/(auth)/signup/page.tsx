"use client";

import { useEffect } from "react";
import FormSignUp from "./form";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  return (
    <div className="flex w-full h-[80vh] items-center justify-center">
      <FormSignUp />
    </div>
  );
}
