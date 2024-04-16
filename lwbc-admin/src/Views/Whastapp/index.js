import React, { useRef, useState, useEffect } from "react";

import {
    InputGroup,
    FormControl,
    Form,
    Card,
    Row,
    Col, Table, Button, Modal, Breadcrumb
} from "react-bootstrap";

import { toast } from "react-toastify";

import { POST, GET } from '../../apicontroller/ApiController'

const WhatsApp = () => {

    const whatsappRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            whatsapp: whatsappRef.current.value,

        };
        POST("whatsapp", formData).then((res) => {
            toast("whatsapp Added Successfully")
        });
    };

    const [whatsapp, setWhatsApp] = useState([]);

    const fetchData = async () => {
        GET("whatsapp").then((result) => {
            setWhatsApp(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> WhatsApp </Breadcrumb.Item>
                </Breadcrumb>
            </Col>


            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> WhatsApp: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={whatsappRef} as="textarea" rows="4" type="text" />
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

                <Col sm={8}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Announcement </th>
                            </tr>
                        </thead>
                        <tbody>
                            {whatsapp.map((whastapps) => (

                                <tr>
                                    <td> {whastapps.id} </td>
                                    <td> {whastapps.whatsapp} </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default WhatsApp