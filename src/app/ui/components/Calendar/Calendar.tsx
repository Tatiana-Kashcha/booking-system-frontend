"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserData } from "../../types/users/dto/user-response.dto";
import { findCurrentUser } from "@/app/actions/users";
import { createApointments } from "@/app/actions/auth";
import { CreateAppointmentDto } from "../../types/appointments/dto/create-appointment.dto";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import styles from "./Calendar.module.css";

export const Calendar = ({ id }: { id: number }) => {
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState("");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const currentUserId = Number(currentUser?.id);

  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findCurrentUser(token);
      setCurrentUser(data);
    };

    fetchData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateTime || !duration || !currentUserId) {
      Notify.failure("Please fill all fields");
      return;
    }

    try {
      setIsDisabled(true);

      const dto: CreateAppointmentDto = {
        appointment_date: new Date(dateTime),
        duration: Number(duration),
        status: "pending",
        clientId: currentUserId,
        businessId: id,
      };

      const newAppointment = await createApointments(dto);
      if (newAppointment) {
        router.push(`/appointments`);
      }
    } catch (error) {
      console.log(error);
      Notify.failure("Create error");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label}>
        Choose date & time:
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Duration appointment, min
        <input
          type="number"
          name="duration"
          placeholder="Duration appointment"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={styles.input}
          required
        />
      </label>
      <button type="submit" className={styles.button} disabled={isDisabled}>
        {isDisabled ? "Create..." : "Create"}
      </button>
    </form>
  );
};
