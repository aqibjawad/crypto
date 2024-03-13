import React, { useState, useEffect } from "react";

import { GET, DELETE } from '../../apicontroller/ApiController'

import {  Row, Col, Table, Breadcrumb } from "react-bootstrap";

import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { toast } from "react-toastify";


const Request = () => {


    const [requests, setRequestes] = useState([]);

    const remove = async (event, id) => {
        await DELETE("jobrequest/delete", id, "").then((result) =>{
            fetchData();
        }) 
    };

    const fetchData = async () => {
        GET("jobrequest").then((result) => {
            setRequestes(result);
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
                    <Breadcrumb.Item active> Jobs Request </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Col sm={12} className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Name </th>
                                    <th> Email </th>
                                    <th> Number </th>
                                    <th> Title </th>
                                    <th> Type </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests && requests.map((request) => (
                                    <tr>
                                        <td> {request.id} </td>
                                        <td> {request.name} </td>
                                        <td> {request.email} </td>
                                        <td> {request.number} </td>
                                        <td> {request.title} </td>
                                        <td> {request.type} </td>
                                        <td> 
                                            <AiFillDelete onClick={(e) => remove(e, request.id)} /> 
                                            <a href={`${process.env.REACT_APP_AWS_URL}${request.document}`} download >
                                                <AiOutlineDownload />
                                            </a> 
                                        </td>
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

export default Request