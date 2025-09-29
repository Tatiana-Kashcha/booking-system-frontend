"use client";

import { useState } from "react";

import { deleteProfile } from "@/app/actions/auth";
import styles from "./AppointmensBtn.module.css";

export const AppointmensBtn = ({
  id,
  showConfirm,
}: {
  id: number;
  showConfirm?: boolean;
}) => {
  const [isDisabledCancel, setIsDisabledCancel] = useState(false);
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(false);

  const handleCancel = async () => {
    try {
      setIsDisabledCancel(true);
      await deleteProfile(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabledCancel(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsDisabledConfirm(true);
      await deleteProfile(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabledConfirm(false);
    }
  };

  return (
    <div className={styles.descriptions}>
      <button
        type="button"
        className={styles.button_delete}
        disabled={isDisabledCancel}
        onClick={handleCancel}
      >
        {isDisabledCancel ? "Cancel..." : "Cancel"}
      </button>

      {showConfirm && (
        <button
          type="button"
          className={styles.button_confirm}
          disabled={isDisabledConfirm}
          onClick={handleConfirm}
        >
          {isDisabledConfirm ? "Confirm..." : "Confirm"}
        </button>
      )}
    </div>
  );
};
