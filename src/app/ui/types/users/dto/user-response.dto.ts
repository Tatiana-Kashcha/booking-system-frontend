export enum Role {
  CLIENT = "client",
  BUSINESS = "business",
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: Role;
  profession?: string;
  description?: string;
}

export interface UserResponseDto {
  user: UserData;
  token: string;
}
