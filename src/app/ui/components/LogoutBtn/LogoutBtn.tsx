"use client";

import { useRouter } from "next/navigation";
import { logOut } from "@/app/actions/auth";
import styles from "./LogoutBtn.module.css";

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={styles.button_logout}
      type="button"
      onClick={handleLogout}
    >
      Logout {"[---"}
    </button>
  );
};
