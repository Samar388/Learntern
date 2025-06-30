export interface SignupForm {
  full_name: string;
  email: string;
  phonenumber: string;
  avatar: File | null;
  password: string;
  confirmpassword: string;
}
