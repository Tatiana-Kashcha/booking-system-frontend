import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  CreateUserDto,
  LoginUserDto,
} from "../ui/types/users/dto/create-user.dto";
import { UserResponseDto } from "../ui/types/users/dto/user-response.dto";
import { UpdateUserDto } from "../ui/types/users/dto/update-user.dto";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

/* This is a description of the backend:
 * POST @  /auth/register
 * body: { name, email, password, role, profession?,  description?}
 */
export async function register(
  credentials: CreateUserDto
): Promise<UserResponseDto> {
  try {
    const res = await axios.post("/auth/register", credentials);
    setAuthHeader(res.data.token);

    return res.data;
  } catch (error) {
    Notify.failure(
      "Oops, such a user may already exist! Try entering other data."
    );
    throw new Error("Registration failed");
  }
}

/* This is a description of the backend:
 * POST @  /auth/login
 * body: { email, password }
 */
export async function login(
  credentials: LoginUserDto
): Promise<UserResponseDto> {
  try {
    const res = await axios.post("/auth/login", credentials);
    setAuthHeader(res.data.token);

    return res.data;
  } catch (error) {
    Notify.failure("Oops, something went wrong! Try again later.");
    throw new Error("Login failed");
  }
}

/* This is a description of the backend:
 * POST @  /auth/logout
 * headers: Authorization: Bearer token
 */
export async function logOut() {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return new Error("Oops, something went wrong!");
  }
}

export function refreshUser(token: string) {
  setAuthHeader(token);
}

/* This is a description of the backend:
 * PATCH @  /users/:id
 * body: { name, email, role, profession?,  description?}
 * headers: Authorization: Bearer token
 */
export async function update(
  id: number,
  credentials: UpdateUserDto
): Promise<UserResponseDto | null> {
  try {
    const res = await axios.patch(`/users/${id}`, credentials);
    setAuthHeader(res.data.token);

    return res.data;
  } catch (error) {
    Notify.failure(
      "Oops, such a user may already exist! Try entering other data."
    );
    throw new Error("Updation failed");
  }
}

/* This is a description of the backend:
 * DELETE @  /users/:id
 * headers: Authorization: Bearer token
 */
export async function deleteProfile(id: number) {
  try {
    await axios.delete(`/users/${id}`);
    clearAuthHeader();
  } catch (error) {
    return new Error("Oops, something went wrong!");
  }
}
