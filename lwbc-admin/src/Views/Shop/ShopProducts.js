import React, { useState, useEffect } from "react";

import { GETID, GET, DELETE } from '../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb, Modal, Button } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';

import { toast } from "react-toastify";

const ShopProducts = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shopid, setShopId] = useState({});

    //Edit FUNCTION
    const view = async (event, id) => {

        GETID("listing", id, "").then((result) => {
            setShopId(result);
        });
        handleShow();
    };

    const [products, setProducts] = useState([]);

        //  Delete Shop products Function and States
        const [delShow, setDelShow] = useState(false);
        const handleCloseDel = () => setDelShow(false);
        const handleShowDel = () => setDelShow(true);
    
        const delView = async (event, id) => {
            GETID("listing", id, '').then((result) => {
                setShopId(result);
            });
            handleShowDel();
        };
    
        const remove = async (event, id) => {
            DELETE("listing/delete", id, "").then((result) => {
                fetchData();
                toast("Your Shop Product is deleted");
            });
            handleCloseDel();
        };


        // Fetch all data here function 
    const fetchData = async () => {
        GET("listing").then((result) => {
            setProducts(result);
        });
    };

    useEffect(() => {
        fetchData();

    }, []) 
    return (
        <div>
            <Row>
                <Col sm={12} className="mt-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                        <Breadcrumb.Item active> Shop Products </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Col sm={12} className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th> # </th>
                                        <th> Name </th>
                                        <th> Shop Name </th>
                                        <th> Product </th>
                                        <th> Porduct Price </th>
                                        <th> Product Currency </th>
                                        <th> Image </th>
                                        <th> Actions </th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {products && products.map((shoppro) => (
                                        <tr>
                                            <td> {shoppro.id} </td>
                                            <td> {shoppro.name} </td>
                                            <td> {shoppro.shopname} </td>
                                            <td> {shoppro.title} </td>
                                            <td> {shoppro.price} </td>
                                            <td> {shoppro.currency} </td>
                                            <td>
                                                <img src={`${process.env.REACT_APP_AWS_URL}${shoppro.image}`} alt="Feature" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                                            </td>
                                            <td> <AiFillDelete onClick={(e) => delView(e, shoppro.id)} />  </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal show={delShow} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title> Delete Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>
                            Are you Sure you want to delete !
                        </span>

                        <div className="my-2 pl-3 mb-5">
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, shopid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default ShopProducts