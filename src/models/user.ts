export interface User {
  id: number;
  name: string;
  email: string;
  ci: number;
  cargo: POSITION;
  role: ROLE;
  password?: string;
  confirmPassword?: string
}

export interface UserToLoggin {
  email: string;
  password: string;
}

export enum ROLE {
  Admin = "Admin",
  User = "User",
}

export enum POSITION {
  Admin = "Administrativo",
  Cleaner = "Limpieza",
}

export const googleUser = {
  id: 0,
  name: "Google User",
  email: "testing@google.com",
  ci: 0,
  cargo: POSITION.Cleaner,
  role: ROLE.User,
};
