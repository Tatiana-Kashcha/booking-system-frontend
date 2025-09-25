import { Role } from "./user-response.dto";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
  profession?: string;
  description?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
