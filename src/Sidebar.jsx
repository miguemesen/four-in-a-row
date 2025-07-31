import React from "react";
import "./Sidebar.scss";
import { FaGamepad } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { getUserInformation } from "./utils";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {user_id} = getUserInformation();
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo-item">
          <a href="/" className="logo-item-nav-link">
            <div>
            <FaGamepad className="icon"/>
            </div>
            <span className="link-text logo-text"></span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            <div>
              <FaHome className="icon" />
            </div>
            <span className="link-text">Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => navigate(`/players`)} className="nav-link">
            <div>
              <FaUser className="icon"/>
            </div>
            <span className="link-text">Players</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
