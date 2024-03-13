import React, { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE } from '../../apicontroller/ApiController'

import { Button, Form, Row, Col, Card, Breadcrumb } from "react-bootstrap";

import { useNavigate } from "react-router-dom"

import 'react-upload-gallery/dist/style.css'

const Details = () => {

    const navigate = useNavigate();

    const [images, setImages] = useState();

    const supercategoryRef = useRef();
    const categoryRef = useRef();
    // const productRef = useRef();
    const specificationsRef = useRef();

    const [supercategories, setSuperCategories] = useState([]);

    const [categories, setCategories] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [supercategoryId, setSuperCategoryId] = useState("")

    const submit = async (event) => {
        event.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("supercategory", supercategoryRef.current.value);
        formData.append("category", categoryRef.current.value);
        // formData.append("product", productRef.current.value);
        formData.append("specifications", specificationsRef.current.value);

        formData.append("addsub", 1);

        for (let index = 0; index < images.length; index++) {
            formData.append("subcategory[]", images[index]);
        }

        POST("subcategory", formData)
            .then((res) => {
                toast("Sub Category Added Successfully");
                supercategoryRef.current.value = '';
                categoryRef.current.value = '';
                // productRef.current.value = '';
                specificationsRef.current.value = '';
                fetchData();
                navigate("/product_details");
            })
            .finally(() => {
                setIsSubmitting(false);
                
                setFormSubmitted(true);
            });
    };

    const fetchData = async () => {
        GET("supercategory").then((result) => {
            setSuperCategories(result);

        });

        GET("category").then((result) => {
            setCategories(result);
        });
    };


    useEffect(() => {
        fetchData();
 
    }, [])

    return (
        <Row>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard" style={{ color: 'black' }}> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item href="/product_details"> Product Details </Breadcrumb.Item>
                    <Breadcrumb.Item active> Details </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Col sm={12}>
                <Card className="mt-2">
                    <Card className="mt-5">
                        <Card.Body>
                            <Form>
                                <div className="row">
                                    <Col md={6}>
                                        <Form.Group className="">
                                            <Form.Label> Main Product </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={supercategoryRef}
                                             onChange={(e) => setSuperCategoryId(e.target.value)}
                                            >
                                                <option value=""> --- Select --- </option>
                                                {supercategories.map((supercategory) => (
                                                    <option value={supercategory.id}>{supercategory.title}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="">
                                            <Form.Label> Product </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={categoryRef}>
                                                <option value=""> --- Select --- </option>
                                                {categories
                                                    .filter((category) => category.spc_id === parseInt(supercategoryId))
                                                    .map((category) => (
                                                        <option value={category.id}>{category.title}</option>
                                                    ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    {/* <Col md={6}>
                                        <Form.Group className="">
                                            <Form.Label> Product Features </Form.Label>
                                            <Form.Control as="textarea" rows="4" ref={productRef} type="text" />
                                        </Form.Group>
                                    </Col> */}

                                    <Col md={6}>
                                        <Form.Group className="">
                                            <Form.Label> Product Specifications </Form.Label>
                                            <Form.Control as="textarea" rows="4" ref={specificationsRef} type="text" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="">
                                            <Form.Label> Image </Form.Label>
                                            <Form.Control accept="file_extension|image/*|video/*" type="file" onChange={(e) => { setImages([...e.target.files]) }} multiple />
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
                </Card>
            </Col>
        </Row>
    )
}

export default Details