import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = true; // Replace this with your actual authentication logic
  // return user ? <Outlet /> : <Navigate to="/login" />;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
