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
