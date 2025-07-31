
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./Home";
import ProjectTemplate from "./ProjectTemplate";
import Players from "./Players";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('username');
  return isAuth ? <Outlet/> : <Navigate to="/login" />
}

const NavigationRouter = () => {
  return (
    <Router>
      <ProjectTemplate>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/players" element={<Players/>} />
        </Routes>
      </ProjectTemplate>
    </Router>
  );
};

export default NavigationRouter;
