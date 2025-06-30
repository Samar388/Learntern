import axiosInstance from "@/utils/axiosInstance";

type User = {
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  updated_at: string;
  created_at: string;
  id: number;
};

type RegisterResponse = {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
};

class AuthService {
  private getToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
    return match ? match[1] : "";
  }
  
  async register(data: FormData): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        "/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async login(email: string, password: string): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<RegisterResponse>("/login", {
        email,
        password,
      });

      const token = response.data.data.token;
      document.cookie = `access_token=${token}; path=/;`;
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async logout(): Promise<void> {
    try {
      await axiosInstance.get("/logout", {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.warn("Logout failed or not implemented on backend", error);
    } finally {
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }

  async forgotPassword(email: string): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        "/forgot-password",
        {
          email,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async resetPassword(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        "/reset-password",
        {
          token,
          email,
          password,
          password_confirmation,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.get<{ data: User }>(
        "/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}

export default new AuthService();
