export interface User {
  id?: number;
  username: string;
  position: string;
  department: string;
  role?: 'employee' | 'admin';
  name?: string,
  surname?:string
}

export interface UserProfile{
  username: string,
  name?:string,
  surname?:string,
  position:string,
  department:string,
}
