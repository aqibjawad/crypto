import React, { useState, useEffect } from "react";

import { GET, DELETE, PUT, GETID } from '../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

import { AiOutlineCheckCircle, AiFillDelete } from 'react-icons/ai';

import { FaTimes } from 'react-icons/fa';

import { toast } from "react-toastify";

const ShopAnnouncements = () => {

    const [announcements, setAnnouncements] = useState([]);

    const fetchData = async () => {
        GET("announcements").then((result) => {
            setAnnouncements(result);
        });
 
    }; 

    useEffect(() => {
        fetchData(); 
    }, [])

    return (
        <Row>
            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Shop Announcements </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Col sm={12} className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th> Shop Id </th>
                                    <th> Shop Name </th>
                                    <th> Shop Address </th>
                                    <th>  Title </th>
                                    <th> Description </th>
                                </tr>
                            </thead>
                            <tbody>
                            {announcements && announcements.map((announce) => (
                                    <tr>
                                        <td> {announce.id} </td>
                                        <td> {announce.shopname} </td>
                                        <td> {announce.address} </td>
                                        <td> {announce.name} </td>
                                        <td> {announce.description} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ShopAnnouncements