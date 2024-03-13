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

import { AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai';

import { FaTimes } from 'react-icons/fa';

const UserNoti = () => {


    const titleRef = useRef();
    const descriptionRef = useRef();
    const userRef = useRef();
    const notifyRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            user: userRef.current.value,
            notify: 2
        };
        POST("notification", formData).then((res) => {
            toast("Coupon Added Successfully")

            titleRef.current.value = '';
            descriptionRef.current.value = '';
            userRef.current.value = '';
            fetchData();
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
    const etitleRef = useRef();
    const eamountRef = useRef();
    const ecustomerRef = useRef();


    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            title: etitleRef.current.value,
            amount: eamountRef.current.value,
            customer: ecustomerRef.current.value,
        };

        PUT("notification", id, formData).then((res) => {
            toast("Coupon Updated Successfully");
            fetchData();
        });
    };



    const [notifications, setNotification] = useState(false);

    const [shop, setShop] = useState(false);

    const fetchData = async () => {
        GET("notification/seller").then((result) => {
            setNotification(result);
        });

        GET("auth/shop").then((result) => {
            setShop(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("company", id, '').then((result) => {
            setCouponId(result[0]);
        });
        handleShowDel();
    };


    const remove = async (event, id) => {
        await DELETE("notification/delete", id, "").then((result) => {
            toast("Notification deleted! ")
            fetchData();
        })
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> User Notification </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Group className="">
                                            <Form.Label> Seller </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={userRef}>
                                                <option value=""> --- Select --- </option>
                                                {shop && shop.map((shopnoti) => (
                                                    <option value={shopnoti.id}>{shopnoti.firstname}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Title </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={titleRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Description </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl as="textarea" rows={4} ref={descriptionRef} />
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
                                        <th> User </th>
                                        <th> title </th>
                                        <th> description </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifications && notifications.map((usernotify) => (
                                        <tr>
                                            <td> {usernotify.id} </td>
                                            <td> {usernotify.user} </td>
                                            <td> {usernotify.title} </td>
                                            <td> {usernotify.description} </td>
                                            <td>
                                                <AiFillDelete onClick={(e) => remove(e, usernotify.id)} />
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
                                <Form.Label>title</Form.Label>
                                <Form.Control type="text" ref={etitleRef} placeholder="Title" />
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, couponid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserNoti