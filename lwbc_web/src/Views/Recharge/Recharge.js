import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST } from "../../apicontroller/ApiController";

const Recharge = () => {
    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    const depositRef = useRef();
    const totalRef = useRef();

    const navigate = useNavigate();

    const [depositAmount, setDepositAmount] = useState('');

    useEffect(() => {
        totalRef.current.value = Number(depositAmount) + 1;
    }, [depositAmount]);

    const handleAmountChange = (event) => {
        const value = event.target.value;
        setDepositAmount(value);
    };

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            deposit: depositRef.current.value,
            total: totalRef.current.value,
            authId: user.authId,
        };
        POST("recharge", formData, header).then((res) => {
            toast("Your Recharge Added");
            navigate("/network")
        });
    };
 
    return (
        <Container>
            <Row>
                <Col className="mt-5">
                    Recharge Chanel
                </Col>

                <Col className="mt-5">
                    USDT TRC20
                </Col>
            </Row>

            <Row className="mt-5">
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Deposit Amount </Form.Label>
                        <Form.Control type="text" placeholder="Enter amount" value={depositAmount} ref={depositRef} onChange={handleAmountChange} />
                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Deposit Exchange Rate</Form.Label>
                        <Form.Control type="text" value="1" readOnly />
                    </Form.Group>
                </Col>

                <Col sm={12}>
                    <Form.Group className="mb-3" controlId="formTotal">
                        <Form.Label>Total</Form.Label>
                        <Form.Control type="text" ref={totalRef} readOnly />
                    </Form.Group>
                </Col>

                <Button onClick={submit} variant="primary" type="submit">
                    Submit
                </Button>
            </Row>
        </Container>
    );
};

export default Recharge;
