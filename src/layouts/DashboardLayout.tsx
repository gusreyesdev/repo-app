import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { NavBar } from "../components/navbar";
import { Loader } from "../components/loader";

export const DashboardLayout = () => {
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

  if (status === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="h-screen">
      <div>
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};
