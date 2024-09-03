import axios from "axios";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

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
    axios
      .get("http://localhost:8000/api/refresh", { withCredentials: true })
      .then(({ data }) => setUserInfo(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
