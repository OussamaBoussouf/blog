
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const userId = localStorage.getItem('user_id');
  if (userId === null) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet/>
}

export default ProtectedRoute;
