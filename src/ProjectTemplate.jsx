import React from "react";
import { useLocation } from "react-router-dom";
import "./ProjectTemplate.scss";
import Sidebar from "./Sidebar";

const ProjectTemplate = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="project-wrapper">
      {pathname !== "/login" && pathname !== "/register" && <Sidebar />}
      <div className="main-container">
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default ProjectTemplate;
