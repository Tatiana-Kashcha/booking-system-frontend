import { Role } from "./user-response.dto";

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  profession?: string;
  description?: string;
}
