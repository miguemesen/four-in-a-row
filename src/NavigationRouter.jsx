import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./Home";
import ProjectTemplate from "./ProjectTemplate";
// import Profile from "./Profile";
import Register from "./Register";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('username');
  return isAuth ? <Outlet/> : <Navigate to="/login" />
}

const NavigationRouter = () => {
  return (
    <Router>
      <ProjectTemplate>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home/>} />
          </Route>
          {/* <Route exact path="/profile" element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile/>} />
          </Route>
          <Route exact path="/profile/:user_id" element={<PrivateRoute />}>
            <Route exact path="/profile/:user_id" element={<Profile/>} />
          </Route> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </ProjectTemplate>
    </Router>
  );
};

export default NavigationRouter;
