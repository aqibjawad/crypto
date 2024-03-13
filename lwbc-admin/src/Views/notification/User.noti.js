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
import { BsFillPencilFill } from 'react-icons/bs';

const UserNoti = () => {
 

    const titleRef = useRef();
    const descriptionRef = useRef();
    const userRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            user: userRef.current.value,
            notify: 1
        };
        POST("notification", formData).then((res) => {
            toast("Notifications Added Successfully")

            titleRef.current.value = '';
            descriptionRef.current.value = '';
            userRef.current.value = '';
            
            fetchData();
        });
    };

    // Edit Funation

    const [notificationid, setNotificationId] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {

        GETID("notification", id, "").then((result) => {
            setNotificationId(result);
        });
        handleShow();
    };

    // Edit Ref
    const enameRef = useRef();
    const edescriptionRef = useRef();


    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = { 
            name: enameRef.current.value,
            description: edescriptionRef.current.value,
        };

        PUT("notification", id, formData).then((res) => {
            toast("Notification Updated Successfully");
            fetchData();
        });
    };



    const [notifications, setNotification] = useState(false);

    const [user, setUser] = useState(false);

    const fetchData = async () => {
        GET("notification/user").then((result) => {
            setNotification(result);
        });

        GET("auth").then((result) => {
            setUser(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("notification/user", id, '').then((result) => {
            setNotificationId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("notification/delete", id, "").then((result) => {
            toast("notifications deleted! ")
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
                                            <Form.Label> User </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={userRef}>
                                                <option value=""> --- Select --- </option>
                                                {user && user.map((usernoti) => (
                                                    <option value={usernoti.id}>{usernoti.firstname}</option>
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
                                                {/* <AiFillDelete onClick={(e) => remove(e, usernotify.id)} /> */}
                                                <AiFillDelete onClick={(e) => delView(e, usernotify.id)} />
                                                <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, usernotify.id)} />
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
                            <Form.Group className="">
                                <Form.Label> User </Form.Label>
                                <Form.Control className="form-control" as="select" ref={userRef}>
                                    <option value=""> --- Select --- </option>
                                    {user && user.map((usernoti) => (
                                        <option value={usernoti.id}>{usernoti.firstname}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>title</Form.Label>
                                <Form.Control type="text" ref={enameRef} defaultValue={notificationid.title} />
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group controlId="title">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} ref={edescriptionRef} defaultvalue={notificationid.description} />
                            </Form.Group>
                        </Col>

                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, notificationid.id)} >
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, notificationid.id)} >
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