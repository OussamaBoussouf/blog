import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import axiosApi from "../api/axios";

type UserInfo = {
  username: string;
  id: string;
};

type UserContextType = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserContextProvider");
  }
  return context;
};

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshTokenExist = document.cookie.includes("refreshToken");
    
    if (accessToken && refreshTokenExist) {
      axiosApi
        .post("http://localhost:8000/api/auth/refresh-token")
        .then(({ data }) => setUserInfo(data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
