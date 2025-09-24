import { Role } from "./user-response.dto";

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  profession?: string;
  description?: string;
}
