import React from 'react';

import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

import { Auth } from "../../context/Auth.Context"

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Header = () => {

    const auth = Auth();

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];

    const navigate = useNavigate()

    const logout = () => {
        auth.activateAuthentication(false);
        auth.activateToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshCycle");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (


        <div id='userheader'>
            <div style={{ backgroundColor: '#007DFF' }}>

                <div className='d-flex justify-content-between w-100 p-3'>
                    <div>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            <h3 className='mb-0 mt-3' style={{ marginLeft: '5rem' }}> UHC Stock </h3>
                        </Link>
                    </div>

                    <div className="col-xl-6 col-lg-5 text-center mt-1" style={{ fontSize: '40px', fontWeight: 'bold' }}>

                        <Link to="/account" style={{ color: 'white', textDecoration: 'none' }}>

                            <span className='text-white'>
                                {user.role.toUpperCase()} / {user.name}
                            </span>
                        </Link>

                    </div>

                    <div>

                        <button className="btn btn-block rounded" onClick={logout} style={{ fontWeight:'bold', fontSize:"30px", color: "white", backgroundColor: "#373A47!important", }} >
                            Logout
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};
export default Header;
