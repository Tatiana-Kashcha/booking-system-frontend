"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProfile } from "@/app/actions/auth";
import styles from "./DeleteProfileBtn.module.css";

export const DeleteProfileBtn = ({ id }: { id: number }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDisabled(true);
      await deleteProfile(id);
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
      className={styles.button_delete}
      disabled={isDisabled}
      onClick={handleDelete}
    >
      {isDisabled ? "Deleting profile..." : "Delete profile"}
    </button>
  );
};
