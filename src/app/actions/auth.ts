import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  CreateUserDto,
  LoginUserDto,
} from "../ui/types/users/dto/create-user.dto";
import { UserResponseDto } from "../ui/types/users/dto/user-response.dto";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
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

/*
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

/*
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

/*
 * GET @  /auth/current
 * headers: Authorization: Bearer token
 */
// export async function refreshUser  {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue("Unable to fetch user");
//     }

//     try {
//       setAuthHeader(persistedToken);

//       const res = await axios.get("/auth/current");

//       return res.data;
//     } catch (error) {
//       return new Error("Oops, something went wrong!");
//     }
//   }
// );
