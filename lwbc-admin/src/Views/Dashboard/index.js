import React, { useEffect, useState } from "react";

import { Card, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom"

import "./index.css"

import { GET } from "../../apicontroller/ApiController"

import { BiStats } from 'react-icons/bi';
import { IoMdStats } from 'react-icons/io';
import { AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdQueryStats } from 'react-icons/md';

import { Line, TimeScale } from 'react-chartjs-2';

const Dashboard = () => {


    return ( 
        <Row>

            <Col sm={4}>
                <Link to="/users">
                    <Card className="mt-5">
                        <div className="card-head4">
                            <Card.Body>
                                <div className="">
                                    <AiOutlineUserAdd style={{ height: "30px", width: "30px" }} />
                                    <div className="total-head"> Users </div>

                                    <div className="total-no"> All users </div>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </Link>
            </Col>

            <Col sm={4}>
                <Link to="/staff">

                    <Card className="mt-5">
                        <div className="card-head7">
                            <Card.Body>
                                <div className="">
                                    <AiOutlineShoppingCart style={{ height: "30px", width: "30px", color:'black' }} />
                                    <div className="total-head text-dark"> Staff </div>
                                    <div className="total-no text-dark">  test </div>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </Link>

            </Col>

        </Row>
    )
}

export default Dashboard