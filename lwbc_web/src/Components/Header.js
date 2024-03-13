import React from "react"

import { Link } from "react-router-dom"

import "./index.css"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#272727', height: '130px' }}>
            <div className="container">
                <div className="d-flex justify-content-between w-100">
                    <div>
                        <img src="Family Loan Insurance Logo.png" style={{ height: '100px', width: '100px' }} />
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                {/* --------------------- Data ------------------------------ */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{ marginLeft: '80px' }}> {/* Centering the navbar items */}
                        <li className="nav-item active mt-2">
                            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
                            <Link to="/aboutus" style={{ textDecoration: 'none', color: 'white' }}>
                                About
                            </Link>
                        </li>


                        <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
                            <Link to="/help" style={{ textDecoration: 'none', color: 'white' }}>
                                Help
                            </Link>
                        </li>

                        <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                                Profile
                            </Link>
                        </li>

                        <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
                            <Link to="/depsoit" style={{ textDecoration: 'none', color: 'white' }}>
                                Deposit
                            </Link>
                        </li>
                        
                        <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
                            <Link to="/witdarwal" style={{ textDecoration: 'none', color: 'white' }}>
                                Witdarwal
                            </Link>
                        </li>

                    </ul>
                </div>



            </div>
        </nav>
    )
}

export default Header