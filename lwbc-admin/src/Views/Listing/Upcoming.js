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

const UpcomingProduct = () => {

    const [image, setImage] = useState();

    const titleRef = useRef();
    const etitleRef = useRef();


    const [upcomings, setUpcoming] = useState(false);

    const submit = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        if (image) formData.append("upcoming", image);


        POST("upcoming", formData).then((res) => {
            toast("Upcoming Added Successfully");
            fetchData();
        });
    };



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [upcoming, setUpcomingId] = useState({});

    //Edit FUNCTION
    const edit = async (event, id) => {

        GETID("upcoming", id, "").then((result) => {
            setUpcomingId(result[0]);
        });
        handleShow(); 
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", etitleRef.current.value);

        if (image) formData.append("supercategory", image);

        PUT("upcoming/update", id, formData).then((res) => {
            fetchData();
            toast("Upcoming Updated Successfully");
            setImage(null);
            handleClose();
        });
    };

    const fetchData = async () => {
        GET("upcoming").then((result) => {
            setUpcoming(result);
        });
    };

    const remove = async (event, id) => {
        DELETE("upcoming/delete", id, "");
        fetchData();
        toast("Your Category is deleted");
        
    };

    useEffect(() => {
        fetchData();
    }, [])


    const columns = useMemo(
        () => [
            {
                Header: "Image",
                accessor: "image",
                Cell: ({ row }) => (
                    <img src={`${process.env.REACT_APP_AWS_URL}${row.image}`} alt="Category" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                )
                // Replace with the actual key for your data
            },

            {
                Header: "Name",
                accessor: "title", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => remove(e, row.id)} />
                        <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, row.id)} />
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
            data: upcomings,
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
                    <Breadcrumb.Item active> Category </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Name </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={titleRef} />
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

            {upcoming  && 
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <div style={{display:'block', marginLeft:'auto', marginRight:'auto'}}>
                        <img src={`${process.env.REACT_APP_AWS_URL}${upcoming.image}`} alt="Category" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    </div>
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Title </Form.Label>
                                <FormControl ref={etitleRef} className="form-control" defaultValue={upcoming.title} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, upcoming.id)} >
                            Submit
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default UpcomingProduct