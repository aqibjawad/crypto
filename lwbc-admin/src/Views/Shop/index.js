import React, { useState, useEffect } from "react";

import { GET, DELETE, PUT, GETID } from '../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

import { AiOutlineCheckCircle, AiFillDelete } from 'react-icons/ai';

import { FaTimes } from 'react-icons/fa';

import { toast } from "react-toastify";

const Shop = () => {

    const [shops, setShops] = useState([]);

    const fetchData = async () => {
        GET("listing/shop").then((result) => {
            setShops(result);
        });
 
    }; 


    const updateStatus = async (event, id) => {
        await PUT("listing/status", id).then((result) =>{
            toast("Shop  Approve! ")  
            fetchData();
        })
    };

    const dactivateStatus = async (event, id) => {
        await PUT("listing/status/deactivate", id).then((result) =>{
            toast("Shop  deactivated! ")  
            fetchData();
        })
    }; 

    const remove = async (event, id) => {
        await DELETE("listing/delete", id, "").then((result) =>{
            toast("Shop deleted! ")  
            fetchData();
        })
    }; 


    useEffect(() => {
        fetchData(); 
    }, [])

    return (
        <Row>
            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Shop </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Col sm={12} className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th> Shop Id </th>
                                    <th> Shop Email </th>
                                    <th> Shop Name </th>
                                    <th> Shop Status </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shops && shops.map((shop) => (
                                    <tr>
                                        <td> {shop.id} </td>
                                        <td> {shop.email} </td>
                                        <td> {shop.shopname} </td>
                                        <td> {shop.ShopStatus} </td>
                                        <td>
                                            <AiOutlineCheckCircle onClick={(e) => dactivateStatus(e, shop.id)} style={{ width: '25px', height: '25px' }} />
                                            <FaTimes onClick={(e) => updateStatus(e, shop.id)} style={{ width: '25px', height: '25px' }} />
                                            {/* <AiFillDelete onClick={(e) => remove(e, shop.id)} style={{ width: '25px', height: '25px' }} /> */}
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

export default Shop