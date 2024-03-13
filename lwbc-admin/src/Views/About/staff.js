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

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Staff = () => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const [image, setImage] = useState();
    const [staffs, setStaff] = useState(false);


    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const roleRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: addressRef.current.value,
            phone: phoneNumber,
            role: roleRef.current.value,
            status: 3
        };
        POST("auth", formData).then((res) => {
            toast("Your Account Added Successfully")

            firstnameRef.current.value = '';
            lastnameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';
            addressRef.current.value = '';
            phoneRef.current.value = '';
        });
    };


    const [staffid, setStaffId] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("staff", id, "").then((result) => {
            setStaffId(result[0]);
        });
        handleShow();
    };

    const enameRef = useRef();
    const ephoneRef = useRef();
    const eemailRef = useRef();
    const edesignationRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", enameRef.current.value);
        formData.append("phone", ephoneRef.current.value);
        formData.append("email", eemailRef.current.value);
        formData.append("designation", edesignationRef.current.value);

        if (image) formData.append("staff", image);

        PUT("staff/update", id, formData).then((res) => {
            fetchData();
            toast("Your Staff Updated Successfully");
        });
    };

    const fetchData = async () => {
        GET("auth/staff").then((result) => {
            setStaff(result);
        });
    };

    const remove = async (event, id) => {
        DELETE("auth/delete", id, "");
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("auth", id, '').then((result) => {
            setStaffId(result[0]);
        });
        handleShowDel();
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Staff </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Name </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={firstnameRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Last Name </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={lastnameRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Email </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="email" ref={emailRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Address </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={addressRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Password </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={passwordRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> phone </Form.Label>
                                        <PhoneInput ref={phoneRef}
                                            country={'us'}  // default country, can be set to your preferred default
                                            value={phoneNumber}
                                            onChange={(phone) => setPhoneNumber(phone)}
                                        />
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="mt-3">
                                            <Form.Label> Satff Type </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={roleRef} >

                                                <option value="Readonly" >
                                                    Read Only
                                                </option>

                                                <option value="Editonly" >
                                                    Add and Edit Data
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    {/* <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Designation </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={designationRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        </InputGroup>
                                    </Col> */}

                                    <Col md={12}>
                                        <Form.Group controlId="submit">
                                            <Button className="mt-3" onClick={submit} variant="primary" type="submit" size="lg" block>
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
                                        <th> Name </th>
                                        <th> Number </th>
                                        <th> Email </th>
                                        <th> Address </th>
                                        <th> Role </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs && staffs.map((staff) => (
                                        <tr>
                                            <td> {staff.id} </td>
                                            <td> {staff.firstname} {staff.lastname}   </td>
                                            <td> {staff.phone} </td>
                                            <td> {staff.email} </td>
                                            <td> {staff.role} </td>
                                            <td> {staff.address} </td>
                                            <td>
                                                <AiFillDelete style={{ color: 'red' }} onClick={(e) => remove(e, staff.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>

            {staffid &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <img src={`${process.env.REACT_APP_AWS_URL}${staffid.image}`} alt="Category" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Name </Form.Label>
                                <FormControl ref={enameRef} className="form-control" defaultValue={staffid.name} placeholder={staffid.name} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Number </Form.Label>
                                <FormControl ref={ephoneRef} className="form-control" defaultValue={staffid.number} placeholder={staffid.number} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Email </Form.Label>
                                <FormControl type="email" ref={eemailRef} className="form-control" defaultValue={staffid.email} placeholder={staffid.email} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Designation </Form.Label>
                                <FormControl ref={edesignationRef} className="form-control" defaultValue={staffid.designation} placeholder={staffid.designation} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Button className="btn-custom border-0 mx-3 mt-4" variant="danger" onClick={(e) => eSubmit(e, staffid.id)} >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            }
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, staffid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Staff