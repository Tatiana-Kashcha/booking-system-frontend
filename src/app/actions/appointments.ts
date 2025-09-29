import { Notify } from "notiflix/build/notiflix-notify-aio";

import {
  AppointmentClientDto,
  AppointmentBusinessDto,
} from "../ui/types/appointments/dto/appointment-response.dto";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

/* This is a description of the backend:
 * GET @  /appointments/client
 * headers: Authorization: Bearer token
 */

export async function findAllClientAppointment(
  token: string
): Promise<AppointmentClientDto[] | null> {
  try {
    const res = await fetch(`${baseURL}/appointments/client`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch client appointment:", res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    Notify.failure("Oh, something went wrong!");
    console.error("Data retrieval error:", error);
    return null;
  }
}

/* This is a description of the backend:
 * GET @  /appointments/business
 * headers: Authorization: Bearer token
 */

export async function findAllBusinessAppointment(
  token: string
): Promise<AppointmentBusinessDto[] | null> {
  try {
    const res = await fetch(`${baseURL}/appointments/business`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch business appointment:", res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    Notify.failure("Oh, something went wrong!");
    console.error("Data retrieval error:", error);
    return null;
  }
}
