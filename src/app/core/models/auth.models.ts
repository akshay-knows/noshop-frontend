export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  token: string;
}

export interface JwtPayload {
  sub?: string;
  roles?: string[];
  exp?: number;
  iat?: number;
}
