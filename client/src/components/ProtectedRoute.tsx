import React from "react";
import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUser();
  console.log(userInfo);
  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
