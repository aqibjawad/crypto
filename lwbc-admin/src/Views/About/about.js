import React, { useRef, useState, useEffect, useMemo } from "react";

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

import { useTable, useFilters, useGlobalFilter } from "react-table";


const About = () => {

    const [image, setImage] = useState();

    const descriptionRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const linkedinRef = useRef();

    const edescriptionRef = useRef();
    const efacebookRef = useRef();
    const einstagramRef = useRef();
    const elinkedinRef = useRef();


    const [about, setAbout] = useState([]);

    const submit = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("description", descriptionRef.current.value);
        formData.append("facebook", facebookRef.current.value);
        formData.append("instagram", instagramRef.current.value);
        formData.append("linkedin", linkedinRef.current.value);

        if (image) formData.append("about", image);


        POST("about", formData).then((res) => {
            toast("Your Sttatus Added Successfully");

            descriptionRef.current.value = '';
            facebookRef.current.value = '';
            linkedinRef.current.value = '';
            instagramRef.current.value = '';

            fetchData();
        });
    };



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [aboutid, setAboutId] = useState([]);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("about", id, "").then((result) => {
            setAboutId(result[0]);
        });
        handleShow();
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("description", edescriptionRef.current.value);
        formData.append("facebook", efacebookRef.current.value);
        formData.append("linkedin", elinkedinRef.current.value);
        formData.append("instagram", einstagramRef.current.value);

        if (image) formData.append("about", image);

        PUT("about", id, formData).then((res) => {

            edescriptionRef.current.value = '';
            efacebookRef.current.value = '';
            elinkedinRef.current.value = '';
            einstagramRef.current.value = '';

            fetchData();

            toast("About Updated Successfully");
        });
    };

    const fetchData = async () => {
        GET("about").then((result) => {
            setAbout(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, []) 

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("company", id, '').then((result) => {
            setAboutId(result[0]);
        });
        handleShowDel();
    };


    const remove = async (event, id) => {
        DELETE("about/delete", id, "");
        fetchData();
    };

    const columns = useMemo(
        () => [

            {
                Header: "Description",
                accessor: "description", // Replace with the actual key for your data
            },

            {
                Header: "Facebook",
                accessor: "facebook", // Replace with the actual key for your data
            },

            {
                Header: "Linkedin",
                accessor: "linkedin", // Replace with the actual key for your data
            },

            {
                Header: "Instagram",
                accessor: "instagram", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
                        <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, row.original.id)} />
                    </div>
                )
            }

            // Add more columns as needed
        ],
        []
    );

    // Use TanStack's useTable hook with useFilters
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: about,
            initialState: {
                // Add initial filter states if needed
                filters: [],
                globalFilter: "",
            },
        },
        useFilters, // Add the useFilters hook to enable filtering
        useGlobalFilter // Add the useGlobalFilter hook to enable global filtering
    );

    const { globalFilter } = state;

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
                                        <Form.Label htmlFor="basic-url"> Description </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl as="textarea" rows="4" type="text" ref={descriptionRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Facebook </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={facebookRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> LinkedIn </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={linkedinRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Instagram </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={instagramRef} />
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
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <input
                                    type="text"
                                    value={globalFilter || ""}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    placeholder="Search..."
                                />

                            </div>

                            <Table striped bordered hover responsive {...getTableProps()}>
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>

            {aboutid &&

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <img src={`${process.env.REACT_APP_AWS_URL}${aboutid.image}`} alt="Category" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Description </Form.Label>
                                <FormControl ref={edescriptionRef} className="form-control" defaultValue={aboutid.description} placeholder={aboutid.description} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Facebook </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="text" ref={efacebookRef} defaultValue={aboutid.facebook} placeholder={aboutid.facebook} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> LinkedIn </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="text" ref={elinkedinRef} defaultValue={aboutid.linkedin} placeholder={aboutid.linkedin} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Instagram </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="text" ref={einstagramRef} defaultValue={aboutid.instagram} placeholder={aboutid.instagram} />
                                </InputGroup>
                            </Col>

                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, aboutid.id)} >
                            Submit
                        </Button>
                    </div>
                </Modal>
            }

            <Modal show={delShow} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title> Delete Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>
                            Are you Sure you want to delete !
                        </span>

                        <div className="my-2 pl-3 mb-5">
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, aboutid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default About