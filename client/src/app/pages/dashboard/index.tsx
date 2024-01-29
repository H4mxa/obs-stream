import { Navigate, useLoaderData } from "react-router-dom";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles.css";

export const Dashboard = () => {
  const isValidToken = useLoaderData();

  return (
    <>
      {isValidToken ? (
        <div className="dashboard-container">
          <Navbar />
          <Sidebar />
          <Content />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
