import { Notify } from "notiflix/build/notiflix-notify-aio";
import { UserData, Role } from "../ui/types/users/dto/user-response.dto";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

/* This is a description of the backend:
 * GET @  /auth/current
 * headers: Authorization: Bearer token
 */

export async function findCurrentUser(token: string): Promise<UserData | null> {
  try {
    const res = await fetch(`${baseURL}/auth/current`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch user:", res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    Notify.failure("Oh, something went wrong!");
    console.error("Data retrieval error:", error);
    return null;
  }
}
