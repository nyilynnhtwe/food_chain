export interface LoginRequest {
  email: string;
  password: string;
  role?: string; // role is optional if it may not always be provided
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string; // role is optional if it may not always be provided
}

export interface RegisterResponse {
  name: string | null;
  email: string | null;
  role?: string | null; // role is optional if it may not always be provided
}