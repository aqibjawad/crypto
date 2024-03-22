import React, { useState } from "react";
import { Link } from "react-router-dom";

import './index.css'

import { AiFillDashboard, AiOutlineUserAdd } from 'react-icons/ai';
import { Auth } from "../../context/Auth.Context";

const SideBar = () => {


  const auth = Auth();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const [active, setActive] = useState(1);

  const [activebutton, setActiveButton] = useState();



  return (
    <div className="sidebar col-3">
      <img src="/Untitled design.png" style={{ height: '220px', width: '220px', marginLeft: '2rem' }} />
      <ul className="list-unstyled user-menubar" style={{ paddingLeft: '1.5rem', paddingTop: '2rem' }}>

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/dashboard" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> Dashboard </p>
            </span>
          </Link>
        </li>

        {/* Users Start */}
        <li className={`${active == 3 ? "active-list" : ""}`} onClick={() => setActive(3)}>
          <Link to="/users" className="menu-item" >
            <span className='d-flex'>
              <AiOutlineUserAdd style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ textDecoration: 'none', fontSize: '15px' }}> Users </p>
            </span>
          </Link>
        </li>
        {/* Users End */}

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/aboutus" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> About us </p>
            </span>
          </Link>
        </li>

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/noti" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> Announcements </p>
            </span>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default SideBar;
