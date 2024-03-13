import React from "react";

import Header from "../Components/Header";
import SideBar from "../Components/Sidebar/index";
import Footer from "../Components/Footer";

import MobHead from "../Components/Header/Mob";

import './index.css'

const WebsiteLayout = ({ children }) => {
    return (
        <React.Fragment>

            {window.innerWidth > 480 ? (
                <Header />
            ) : (
                <MobHead />
            )}

            <div className="d-flex">

                {window.innerWidth > 480 ? (
                    <SideBar />
                ) : (
                    ""
                )}
                
                <div className="container main-body">
                    {children}
                </div>

            </div>

            {/* <Footer /> */}

        </React.Fragment>
    );
}

export default WebsiteLayout;
