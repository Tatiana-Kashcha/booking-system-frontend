"use client";

import { useState, useEffect } from "react";

import { findCurrentUser } from "@/app/actions/users";
import {
  findAllClientAppointment,
  findAllBusinessAppointment,
} from "@/app/actions/appointments";
import {
  AppointmentClientDto,
  AppointmentBusinessDto,
} from "../../types/appointments/dto/appointment-response.dto";
import { Role } from "../../types/users/dto/user-response.dto";
import { AppointmentCardClient } from "../AppointmentCardClient/AppointmentCardClient";
import { AppointmentCardBusiness } from "../AppointmentCardBusiness/AppointmentCardBusiness";
import styles from "./AppointmentList.module.css";

export const AppointmentList = () => {
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [clientAppointment, setClientAppointment] = useState<
    AppointmentClientDto[] | null
  >([]);
  const [businessAppointment, setBusinessAppointment] = useState<
    AppointmentBusinessDto[] | null
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findCurrentUser(token);
      setRole(data?.role as Role);

      if (data?.role === Role.CLIENT) {
        const appointment = await findAllClientAppointment(token);
        setClientAppointment(appointment);
      }
      if (data?.role === Role.BUSINESS) {
        const appointment = await findAllBusinessAppointment(token);
        setBusinessAppointment(appointment);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.user_div}>
      <h1 className={styles.title}>My appointments list</h1>

      {role === Role.CLIENT && (
        <ul className={styles.list}>
          {clientAppointment?.map((item: AppointmentClientDto) => (
            <li key={item.id}>
              <AppointmentCardClient item={item} />
            </li>
          ))}
        </ul>
      )}

      {role === Role.BUSINESS && (
        <ul className={styles.list}>
          {businessAppointment?.map((item: AppointmentBusinessDto) => (
            <li key={item.id}>
              <AppointmentCardBusiness item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
