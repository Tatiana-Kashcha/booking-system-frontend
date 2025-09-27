"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/actions/auth";
import styles from "./LogoutBtn.module.css";

export const LogoutBtn = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsDisabled(true);
      await logOut();
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.button_logout}
      disabled={isDisabled}
      onClick={handleLogout}
    >
      {isDisabled ? "...Logout" : "Logout"} {"[---"}
    </button>
  );
};
