import React, { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import {
    InputGroup,
    FormControl,
    Form,
    Card,
    Row,
    Col, Table, Button, Modal, Breadcrumb
} from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

const Coupon = () => {


    const codeRef = useRef();
    const amountRef = useRef();
    const customerRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            code: codeRef.current.value,
            amount: amountRef.current.value,
            customer: customerRef.current.value,
        };
        POST("coupon", formData).then((res) => {
            toast("Coupon Added Successfully")
        });
    };

    // Edit Funation

    const [couponid, setCouponId] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        setCouponId(id);
        GETID("coupon", id, "");
        handleShow();
    };

    // Edit Ref
    const ecodeRef = useRef();
    const eamountRef = useRef();
    const ecustomerRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            code: ecodeRef.current.value,
            amount: eamountRef.current.value,
            customer: ecustomerRef.current.value,
        };

        PUT("coupon", id, formData).then((res) => {
            toast("Coupon Updated Successfully");
            fetchData();
        });
    };



    const [coupons, setCoupons] = useState(false);

    const fetchData = async () => {
        GET("coupon/").then((result) => {
            setCoupons(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const remove = async (event, id) => {
        await DELETE("coupon/delete", id, "").then((result) =>{
            toast("Coupons deleted! ")  
            fetchData();
        })
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Coupon </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Code </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={codeRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Amount </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={amountRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Customer </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={customerRef} />
                                        </InputGroup>
                                    </Col>


                                    <Col md={12}>
                                        <Form.Group controlId="submit">
                                            <Button onClick={submit} variant="primary" type="submit" size="lg" block>
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Col>

                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={8} className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th> Amount </th>
                                        <th> Code </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons && coupons.map((coupon) => (
                                        <tr>
                                            <td> {coupon.id} </td>
                                            <td> {coupon.amount} </td>
                                            <td> {coupon.code} </td>
                                            <td>
                                                <AiFillDelete onClick={(e) => remove(e, coupon.id)} />
                                                <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, coupon.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="">

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text" ref={ecodeRef} placeholder="Title" />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" ref={eamountRef} placeholder="Title" />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control type="text" ref={ecustomerRef} placeholder="Title" />
                            </Form.Group>
                        </Col>

                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, couponid)} >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default Coupon