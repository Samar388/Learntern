import axiosInstance from "@/utils/axiosInstance";

class TaskService {
  async submitTask(data: any, id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.post<{ data: any }>(
        `/task/${id}/submit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async createTask(data: any, id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.post<{ data: any }>(
        `modules/${id}/task/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getSubmittedTask(id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.get<{ data: any }>(
        `/task/submission/${id}`,
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

  async getSubmittedTasks(id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.get<{ data: any }>(
        `/task/submission/${id}`,
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

  async postFeedback(data: any, id: number): Promise<any> {
    try {
      const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
      const token = match ? match[1] : "";

      const response = await axiosInstance.post<{ data: any }>(
        `/task/${id}/feedback`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

export default new TaskService();
