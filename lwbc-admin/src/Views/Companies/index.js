import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"

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


const Companies = () => {

    const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];


    const linkRef = useRef();

    const [image, setImage] = useState();


    const [companies, setCompanies] = useState(false);

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("link", linkRef.current.value);

        if (image) formData.append("company", image);

        POST("company", formData).then((res) => {
            toast("Company Added Successfully");

            linkRef.current.value = '';

            fetchData();
        });
    };

    const [companyid, setCompanyId] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("company", id, "").then((result) => {
            setCompanyId(result[0]);
        });
        handleShow();
    };


    const elinkRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("link", elinkRef.current.value);


        if (image) formData.append("company", image);

        PUT("company", id, formData).then((res) => {
            toast("Company Updated Successfully");

            elinkRef.current.value = '';

            fetchData();
            setImage(null);
            handleClose();
        });
    };


    const fetchData = async () => {
        GET("company").then((result) => {
            setCompanies(result);
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
            setCompanyId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("company/delete", id, "").then((result) => {
            toast("Company deleted! ")
            fetchData();
            handleCloseDel();
        })
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Companies </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">
                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Link </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={linkRef} />
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
                                        <th> Image </th>
                                        <th> Link </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies && companies.map((company) => (
                                        <tr>
                                            <td> {company.id} </td>
                                            <img src={`${process.env.REACT_APP_AWS_URL}${company.image}`} alt="company" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                                            <td> 
                                                <Link style={{textDecoration:"none", color:'black'}}>
                                                    {company.link} 
                                                </Link>
                                            </td>
                                            <td>
                                                {/* <AiFillDelete onClick={(e) => remove(e, company.id)} /> */}
                                                <AiFillDelete onClick={(e) => delView(e, company.id)} />
                                                <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, company.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>

            {companyid &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <img src={`${process.env.REACT_APP_AWS_URL}${companyid.image}`} alt="Company" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    <Modal.Body>
                        <Row className="">

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Link </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl  ref={elinkRef} className="form-control" defaultValue={companyid.link} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Button className="btn-custom border-0 mx-3 mt-4" variant="danger" onClick={(e) => eSubmit(e, companyid.id)} >
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, companyid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Companies