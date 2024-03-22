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

const Notification = () => {

    const announcementRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            announcement: announcementRef.current.value,

        };
        POST("announcements", formData).then((res) => {
            toast("Announcements Added Successfully")
        });
    };

    const [announcements, setAnnouncements] = useState([]);

    const fetchData = async () => {
        GET("announcements").then((result) => {
            setAnnouncements(result);
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
                    <Breadcrumb.Item active> About </Breadcrumb.Item>
                </Breadcrumb>
            </Col>


            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Announcement No 1: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={announcementRef} as="textarea" rows="4" type="text" />
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
                            {announcements.map((announcementts) => (

                                <tr>
                                    <td> {announcementts.id} </td>
                                    <td> {announcementts.announcement} </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Notification