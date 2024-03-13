import React, { useState, useEffect } from "react";

import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

import { GET } from "../../apicontroller/ApiController"

import { AiOutlineDownload } from 'react-icons/ai';

const Bank = () => {

    const [bank, setBank] = useState([]);

    const fetchData = async () => {
        GET("listingbank").then((result) => {
            setBank(result);
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
                    <Breadcrumb.Item active> Bank </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Col sm={12} className="mt-3">
                <div className="card">
                    <div className="card-body"> 
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th> Bank Id </th>
                                    <th> Bank Name </th>
                                    <th> Account Holder Name </th>
                                    <th> Code </th>
                                    <th> Account Number </th>
                                    <th> Seller Documents </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bank && bank.map((bank) => (
                                    <tr>
                                        <td> {bank.id} </td>
                                        <td> {bank.bankname} </td>
                                        <td> {bank.acc_hold} </td>
                                        <td> {bank.code} </td>
                                        <td> {bank.acc_no} </td>
                                        <td> 
                                            <a href={`${process.env.REACT_APP_AWS_URL}${bank.document}`} download >
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

export default Bank