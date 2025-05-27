"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      Logout
    </button>
  );
}
