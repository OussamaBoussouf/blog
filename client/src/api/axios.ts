import axios from "axios";

const axiosApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_HOSTNAME}/api`,
  withCredentials: true,
});

async function refreshToken() {
  try {
    const response = await axiosApi.post("/auth/refresh-token");
    localStorage.setItem("accessToken", response.headers["x-access-token"]);
  } catch (error) {
    throw new Error("Refresh token is expired or invalid");
  }
}

const logout = async () => {
  try {
    await axiosApi.post("/auth/logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");

    window.location.href = "/login"; // Redirect to login or home page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

axiosApi.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.status === 401) {
      try {
        await refreshToken();
        const newAccessToken = localStorage.getItem("accessToken");

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
