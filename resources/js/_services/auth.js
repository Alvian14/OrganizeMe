import { useJwt } from "react-jwt";
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

export const loginUser = async ({username, password}) => {
  const response = await API.post("/login", {username, password});
  return response.data;
};

export const logout = async ({token}) => {
  try {
    const {data} = await API.post("/logout", {token}, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    localStorage.removeItem("accessToken");
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}


export const useDecodeToken = () => {
  const token = localStorage.getItem("accessToken");
  const { decodedToken, isExpired } = useJwt(token);

  if (!token) {
    return {
      success: false,
      message: "No token",
      data: null,
    };
  }

  if (isExpired) {
    return {
      success: false,
      message: "Token expired",
      data: null,
    };
  }

  return {
    success: true,
    message: "Token valid",
    data: decodedToken,
  };
};
