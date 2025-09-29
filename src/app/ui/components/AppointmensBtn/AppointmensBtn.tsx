"use client";

import { useState } from "react";

import { deleteApointment, updateAppointmentStatus } from "@/app/actions/auth";
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
      await deleteApointment(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabledCancel(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsDisabledConfirm(true);
      await updateAppointmentStatus(id, "confirmed");
      window.location.reload();
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
