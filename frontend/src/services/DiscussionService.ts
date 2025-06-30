import axiosInstance from "@/utils/axiosInstance";

class DiscussionService {
  async getUserProfile(id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.get<{ data: any }>(
        `/discussions/${id}/messages`,
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

  async postDiscussionMessage(message: string, id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.post<{ data: any }>(
        `/discussions/${id}/messages`,
        { message: message },
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

export default new DiscussionService();
