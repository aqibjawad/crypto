import React, { useState } from "react";
import { Link } from "react-router-dom";

import './index.css'

import { AiFillDashboard, AiOutlineUserAdd, AiFillContacts, AiOutlineVideoCameraAdd, AiFillShop, AiOutlineNotification } from 'react-icons/ai';
import { FaLocationArrow, FaFirstOrderAlt } from 'react-icons/fa';
import { BsChevronCompactDown, BsFillFilePersonFill, BsFillCameraVideoFill, BsDot, } from 'react-icons/bs';
import { FcAbout, FcDepartment } from 'react-icons/fc';

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
      <img src="/Family Loan Insurance Logo.png" style={{ height: '150px', marginTop: '2rem', width: '150px', marginLeft: '2rem' }} />
      <ul className="list-unstyled user-menubar" style={{ paddingLeft: '1.5rem', paddingTop: '2rem' }}>

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/dashboard" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> Dashboard </p>
            </span>
          </Link>
        </li>

        {user.role === 'admin' && (
          <>
            <div className='menu-item' style={{ fontSize: '12px', fontWeight: 'bold' }}>
              <div className='menu-content pt-8 pb-2'>
                <BsDot />
                <span className='menu-section text-muted text-uppercase fs-8 ls-1'>User</span>
              </div>
            </div>

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
          </>
        )}

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/dashboard" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> About us </p>
            </span>
          </Link>
        </li>

        <li className={`${active == 1 ? "active-list" : ""}`} onClick={() => setActive(1)}>
          <Link to="/dashboard" className="menu-item" >
            <span className='d-flex'>
              <AiFillDashboard style={{ color: 'white', fontSize: '20px' }} />
              <p style={{ fontSize: '15px' }}> Notification </p>
            </span>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default SideBar;
