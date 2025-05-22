import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/signin">Sign in</Link>
      </li>
      <li>
        <Link href="/signup">Sign up</Link>
      </li>
    </ul>
  );
}
