export interface SignupErrors {
  full_name?: string;
  email?: string;
  phonenumber?: string;
  avatar?: string;
  password?: string;
  confirmpassword?: string;
  [key: string]: string | undefined;
}
