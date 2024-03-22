import React, { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

import { POST, GET } from '../../apicontroller/ApiController'

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

import { useTable, useFilters, useGlobalFilter } from "react-table";

const About = () => {

    const question1Ref = useRef();
    const answer1Ref = useRef();

    const question2Ref = useRef();
    const answer2Ref = useRef();

    const question3Ref = useRef();
    const answer3Ref = useRef();

    const question4Ref = useRef();
    const answer4Ref = useRef();

    const question5Ref = useRef();
    const answer5Ref = useRef();


    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            question1: question1Ref.current.value,
            answer1: answer1Ref.current.value,

            question2: question2Ref.current.value,
            answer2: answer2Ref.current.value,

            question3: question3Ref.current.value,
            answer3: answer3Ref.current.value,

            question4: question4Ref.current.value,
            answer4: answer4Ref.current.value,

            question5: question5Ref.current.value,
            answer5: answer5Ref.current.value,

        };
        POST("about", formData).then((res) => {
            toast("About Added Successfully")
        });
    };

    const [about, setAbout] = useState([]);

    const fetchData = async () => {
        GET("about").then((result) => {
            setAbout(result[0]);
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
                                        <Form.Label htmlFor="basic-url"> Question No 1: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={question1Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>


                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Answer No 1: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={answer1Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Question No 2: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={question2Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Answer No 2: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={answer2Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Question No 3: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={question3Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Answer No 3: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={answer3Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Question No 4: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={question4Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Answer No 4: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={answer4Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Question No 5: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={question5Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Answer No 5: </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl ref={answer5Ref} as="textarea" rows="2" type="text" />
                                        </InputGroup>
                                    </Col>


                                    <Col md={12}>
                                        <Form.Group>
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
                                <th>Q 1</th>
                                <th> Ans 1 </th>
                              
                                <th>Q 2</th>
                                <th> Ans 2 </th>

                                <th>Q 3</th>
                                <th> Ans 3 </th>

                                <th>Q 4</th>
                                <th> Ans 4 </th>

                                <th>Q 5</th>
                                <th> Ans 5 </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {about.question1} 
                                </td>

                                <td>
                                    {about.answer1} 
                                </td>

                                <td>
                                    {about.question2} 
                                </td>

                                <td>
                                    {about.answer2} 
                                </td>

                                <td>
                                    {about.question3} 
                                </td>

                                <td>
                                    {about.answer3} 
                                </td>

                                <td>
                                    {about.question4} 
                                </td>

                                <td>
                                    {about.answer4} 
                                </td>

                                <td>
                                    {about.question5} 
                                </td>

                                <td>
                                    {about.answer5} 
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>

            </Row>
        </div>
    )
}

export default About