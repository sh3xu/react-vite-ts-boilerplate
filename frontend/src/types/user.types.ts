export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: "user" | "admin";
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}
