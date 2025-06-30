import { SignupErrors } from "@/interfaces/SignupErrors";
import { SignupForm } from "@/interfaces/SignupForm";

export const validateForm = (data: SignupForm): SignupErrors => {
  const inputErrors: SignupErrors = {};

  if (!data.full_name.trim()) inputErrors.full_name = "Full Name is required";
  if (!data.email.trim()) inputErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email))
    inputErrors.email = "Email is invalid";

  if (!data.phonenumber.trim())
    inputErrors.phonenumber = "Phone number is required";
  else if (!/^\d{10}$/.test(data.phonenumber))
    inputErrors.phonenumber = "Phone number must be 10 digits";

  if (!data.avatar) inputErrors.avatar = "Avatar is required";
  if (!data.password) inputErrors.password = "Password is required";
  else if (
    !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}/.test(
      data.password
    )
  ) {
    inputErrors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
  }
  if (!data.confirmpassword)
    inputErrors.confirmpassword = "Please confirm your password";
  else if (data.password !== data.confirmpassword)
    inputErrors.confirmpassword = "Passwords do not match";
  return inputErrors;
};
