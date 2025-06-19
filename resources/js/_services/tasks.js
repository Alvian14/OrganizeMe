import { API } from "../_api"

export const getTasks = async () => {
    const {data} = await API.get('/tasks')
    return data
}

export const getTasksByUserId = async (id) => {
  try {
    const response = await API.get(`/users/${id}/tasks`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil task user:", error);
    throw error;
  }
};

export const getTasksByUserIdFull = async (id) => {
  try {
    const response = await API.get(`/users/${id}/myTasks`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil task user:", error);
    throw error;
  }
};

export const updateTasks = async (id, formData) => {
  try {
    // Gunakan FormData jika mengirim file (image)
    const response = await API.post(`/tasks/${id}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal update task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await API.delete(`/tasks/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus task:", error);
    throw error;
  }
};

export const insertTask = async (formData) => {
  try {
    const response = await API.post(`/tasks/insert`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal menambah task:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await API.get('/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch categories");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error.response?.status === 401) {
      throw new Error("Authentication required. Please login again.");
    }
    throw new Error(error.response?.data?.message || "Failed to load categories. Please try again later.");
  }
};
