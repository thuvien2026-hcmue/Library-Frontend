import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ❌ chưa đăng nhập
  if (!token) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ đã đăng nhập
  return <Outlet />;
}
