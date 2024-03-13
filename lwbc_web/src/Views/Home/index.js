import { Card, Row, Container, Col, Form, FormControl, Button } from 'react-bootstrap';

import { GrTransaction } from "react-icons/gr";

import "./index.css"

import { Link } from "react-router-dom"

const Home = () => {

    return (
        <Container>

            <Row>
                <Col sm={4}>
                    <div className="circle">
                        <p>
                            Level 1
                        </p>

                        <p>
                            Free Member
                        </p>
                    </div>
                </Col >

                <Col sm={8}>

                    <div className="square">

                        <div className="content mb-3">
                            <p>
                                Referral URL
                            </p>
                        </div>

                        <div className="search">
                            <Form >
                                <FormControl className="custom-search" type="text" placeholder="Search" />
                            </Form>
                        </div>
                    </div>

                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className='card-home'>
                        <Card.Body>
                            <GrTransaction />
                            <Card.Text>
                                <Link to="/recharge" style={{ textDecoration: 'none', color: 'black' }}>
                                    Recharge
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card className='card-home'>
                        <Card.Body>
                            <GrTransaction />

                            <Card.Text>
                                <Link to="/witdarwal" style={{ textDecoration: 'none', color: 'black' }}>
                                    Witdarwal
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}

export default Home;
