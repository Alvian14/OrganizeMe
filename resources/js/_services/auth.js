import { API } from "../_api";

export const getUser = async () => {
    const { data } = await API.get('/users');
    return data.data || data;
};

// kode untuk menghapus data user
export const deleteUser = async (id) => {
  try {
    await API.delete(`/users/${id}`)
  } catch (error) {
    console.log(error);
    throw error
  }
}

// kode untuk memperbarui data
export const updateUserRole = async (id, data) => {
  const response = await API.put(`/users/${id}`, data);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  return response.data;
};


