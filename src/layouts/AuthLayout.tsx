import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/loader";
import { useAuthStore } from "../hooks";

export const AuthLayout = () => {
  const { status, startCheckAuth } = useAuthStore();

  useEffect(() => {
    startCheckAuth();
  }, []);

  if (status === "checking") {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }

  if (status === "authorized") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};
