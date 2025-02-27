export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  name: string;
  surname: string;
  password: string;
  department: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: 'employee' | 'admin';
  };
}
