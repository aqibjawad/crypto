import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom"

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import { InputGroup, FormControl, Form, Card, Row, Col, Table, Button, Modal, Breadcrumb } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

import { useTable, useFilters, useGlobalFilter } from "react-table";


const CrousalOne = () => {

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];


    const [image, setImage] = useState();

    const titleRef = useRef();
    const linkRef = useRef();

    const [crousals, setCrousals] = useState([]);

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("link", linkRef.current.value);

        if (image) formData.append("crousalone", image);


        POST("crousalone", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                titleRef.current.value = '';
                linkRef.current.value = '';

                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });

        setImage(null);
    };

    const [crousaloneid, setCrousalOneId] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("crousalone", id, "").then((result) => {
            setCrousalOneId(result);
        });
        handleShow();
    };

    const etitleRef = useRef();
    const elinkRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", etitleRef.current.value);
        formData.append("link", elinkRef.current.value);

        if (image) formData.append("crousalone", image);

        PUT("crousalone", id, formData).then((res) => {
            handleClose();
            toast("First Crousal Updated Successfully");

            etitleRef.current.value = '';
            elinkRef.current.value = '';

            fetchData();
        });
    };

    const fetchData = async () => {
        GET("crousalone").then((result) => {
            setCrousals(result);
        });
    };

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("crousalone", id, '').then((result) => {
            setCrousalOneId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("crousalone/delete", id, "").then((result) => {
            fetchData();
            toast("Crousal One deleted! ")
        })
    };

    useEffect(() => {
        fetchData();
    }, [])

    const columns = useMemo(
        () => {
            const commonColumns = [
                {
                    Header: "Image",
                    accessor: "image",
                    Cell: ({ row }) => (
                        <img src={`${process.env.REACT_APP_AWS_URL}${row.original.image}`} alt="Crousal" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                    )
                    // Replace with the actual key for your data
                },

                {
                    Header: "Title",
                    accessor: "title", // Replace with the actual key for your data
                },

                {
                    Header: "Link",
                    accessor: "link", // Replace with the actual key for your data
                },
            ];

            // Conditionally include the "Actions" column based on some condition
            if (user.role === 'admin') {
                commonColumns.push({
                    Header: 'Actions',
                    accessor: 'id',
                    Cell: ({ row }) => (
                        <div>
                            <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
                            <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, row.original.id)} />
                        </div>
                    ),
                });
            }

            return commonColumns;
        },
        [] // Make sure to include all dependencies for the condition in the dependency array
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
            data: crousals,
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
                    <Breadcrumb.Item active> Crousal One </Breadcrumb.Item>
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
                                        <Form.Label htmlFor="basic-url"> Link </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={linkRef} />
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

            {crousaloneid &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>

                    <img src={`${process.env.REACT_APP_AWS_URL}${crousaloneid[0]?.image}`} alt="Crousal One" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Title </Form.Label>
                                <FormControl ref={etitleRef} className="form-control" defaultValue={crousaloneid[0]?.title} placeholder={crousaloneid[0]?.title} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Link </Form.Label>
                                <FormControl ref={elinkRef} className="form-control" defaultValue={crousaloneid[0]?.link} placeholder={crousaloneid[0]?.link} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} required />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, crousaloneid[0]?.id)} >
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, crousaloneid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CrousalOne