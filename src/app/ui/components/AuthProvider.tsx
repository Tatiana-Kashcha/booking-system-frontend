"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refreshUser } from "@/app/actions/auth";

import Loader from "./Loader/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/");
    }
    if (token) {
      refreshUser(token);
    }
    setLoading(false);
  }, [router, pathname]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
