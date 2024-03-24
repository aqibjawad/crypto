import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST } from "../../apicontroller/ApiController";

const Witdarwal = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    const witdarwal_amountRef = useRef();

    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            witdarwal_amount: witdarwal_amountRef.current.value,
            authId: user.authId,
        };
        POST("witdawarl", formData, header).then((res) => {
            toast("Your Witdarwal Your Amount");
            navigate("/home")
        });
    };

    return (
        <Container>
            <Row>
                <Col className="mt-5">
                    Witdarwal Chanel
                </Col>

                <Col className="mt-5">
                    USDT TRC20
                </Col>
            </Row>

            <Row className="mt-5">
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Witdarwal Amount </Form.Label>
                        <Form.Control type="text" placeholder="Enter Witdawral amount" ref={witdarwal_amountRef} />
                    </Form.Group>
                </Col>

                <Button onClick={submit} variant="primary" type="submit">
                    Submit
                </Button>
            </Row>
        </Container>
    )
}

export default Witdarwal