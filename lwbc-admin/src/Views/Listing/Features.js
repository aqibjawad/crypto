import React, { useState, useEffect, useRef, useMemo } from "react";

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

const Features = () => {

    const [image, setImage] = useState();

    const priceRef = useRef();
    const descriptionRef = useRef();

    const [features, setFeatures] = useState(false);

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("price", priceRef.current.value);
        formData.append("description", descriptionRef.current.value);

        if (image) formData.append("features", image);


        POST("features", formData).then((res) => {
            toast("Features Added Successfully");
            fetchData();
        });
    };

    const [featureid, setFeatureId] = useState([]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        setFeatureId(id);
        GETID("features", id, "");
        handleShow();
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        if (image) formData.append("features", image);

        PUT("features", id, formData).then((res) => {
            toast("Features Updated Successfully");
            fetchData();
        });
    };


    const fetchData = async () => {
        GET("features/").then((result) => {
            setFeatures(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const remove = async (event, id) => {
        await DELETE("features/delete", id, "").then((result) =>{
            toast("Features deleted! ")  
            fetchData();
        })
    };


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Feature Products </Breadcrumb.Item>
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
                                        <Form.Group className="">
                                            <Form.Label> Price </Form.Label>
                                            <Form.Control ref={priceRef} type="text" placeholder="Product" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="">
                                            <Form.Label> Description </Form.Label>
                                            <Form.Control as="textarea" rows="4" ref={descriptionRef} type="text" />
                                        </Form.Group>
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
                                        <th> Price </th>
                                        <th> Description </th>
                                        <th> Image </th>
                                        <th> Action </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {features && features.map((feature) => (
                                        <tr>
                                            <td> {feature.id} </td>
                                            <td> {feature.price} </td>
                                            <td> {feature.description} </td>
                                            <img src={`${process.env.REACT_APP_AWS_URL}${feature.image}`} alt="Feature" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                                            <td>
                                                <AiFillDelete onClick={(e) => remove(e, feature.id)} />
                                                <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, feature.id)} />
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
                        <Col md={12}>
                            <Form.Label htmlFor="basic-url"> Image </Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, featureid)} >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default Features