import { Module } from "./Module";

export interface User {
  full_name: string;
  email: string;
  phone_number?: string;
  role: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  avatar?: string;
  intern_modules?: Module[];
}
