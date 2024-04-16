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

const Wallet = () => {

    const walletRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            wallet: walletRef.current.value,

        };
        POST("walletaddress", formData).then((res) => {
            toast("wallet Added Successfully")
        });
    };

    const [wallett, setWallet] = useState([]);

    const fetchData = async () => {
        GET("walletaddress").then((result) => {
            setWallet(result);
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
                    <Breadcrumb.Item active> Wallet </Breadcrumb.Item>
                </Breadcrumb>
            </Col>


            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Wallet Address: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={walletRef} as="textarea" rows="4" type="text" />
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
                            {wallett.map((announcementts) => (

                                <tr>
                                    <td> {announcementts.id} </td>
                                    <td> {announcementts.wallet} </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Wallet