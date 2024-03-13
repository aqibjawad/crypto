import React, { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import {
    InputGroup,
    FormControl,
    Form,
    Card,
    Container,
    Row,
    Col, Table, Button, Modal, Breadcrumb
} from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

const CrousalTwo = () => {

    const [image, setImage] = useState();

    const titleRef = useRef();

    const [crousals, setCrousals] = useState(false);

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);

        if (image) formData.append("crousalsecond", image);


        POST("crousalsecond", formData).then((res) => {
            toast("Second Crousal Added Successfully");
        });
    };

    const [crousalsecondid, setCrousalSecondId] = useState([]);
    const [crousalsecond, setCrousalSecond] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        setCrousalSecondId(id);
        GETID("crousalsecond", id, "");
        handleShow();
    };

    const etitleRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", etitleRef.current.value);

        if (image) formData.append("crousalsecond", image);

        PUT("crousalsecond", id, formData).then((res) => {
            toast("Second Crousal Updated Successfully");
            fetchData();
        });
    };

    const fetchData = async () => {
        GET("crousalsecond/").then((result) => {
            setCrousals(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const remove = async (event, id) => {
        await DELETE("crousalsecond/delete", id, "").then((result) =>{
            toast("Crousal Two deleted! ")  
            fetchData();
        })
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Crousal Two </Breadcrumb.Item>
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
                                            <FormControl type="text" ref={titleRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
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
                                        <th> Title </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {crousals && crousals.map((crousalsecond) => (
                                        <tr>
                                            <td> {crousalsecond.id} </td>
                                            <img src={`${process.env.REACT_APP_AWS_URL}${crousalsecond.image}`} height="30px" width="30px" style={{ margin: '0.5rem' }} />
                                            <td> {crousalsecond.title} </td>
                                            <td>
                                                <AiFillDelete onClick={(e) => remove(e, crousalsecond.id)} />
                                                <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, crousalsecond.id)} />
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
                            <Form.Label htmlFor="basic-url"> Title </Form.Label>
                            <FormControl ref={etitleRef} className="form-control" />
                        </Col>

                        <Col md={6}>
                            <Form.Label htmlFor="basic-url"> Image </Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, crousalsecondid)} >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default CrousalTwo