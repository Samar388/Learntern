import axiosInstance from "@/utils/axiosInstance";

class ModuleService {
  private getToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
    return match ? match[1] : "";
  }

  async getEnrolledModules(): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get("/modules/enrolled", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getEnrolledModulesMentor(): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get("/modules/mentor/enrolled", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getModuleTasks(moduleID: number): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get(
        `/modules/${moduleID}/task/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getModuleTask(taskID: number): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get(`/modules/task/${taskID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async createModule(moduleData: any): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.post("/modules/create", moduleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async readModule(): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get("/modules/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async deleteModule(id: number): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.delete(`/modules/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async assignIntern(emails: string[], moduleID: number): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axiosInstance.post(
        `/modules/${moduleID}/assign-intern`,
        { emails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}

export default new ModuleService();
