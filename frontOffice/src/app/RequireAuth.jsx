import { Navigate, Outlet, useLocation } from 'react-router-dom'


export function RequireAuth() {

  const location = useLocation()
  const token = localStorage.getItem("token");

  console.log("TOKEN CHECK:", token);

  if (!token) {
    return <Navigate to="/auth/login"  replace state={{ from: location }}/>;
  }

  return <Outlet />
}
