import React, { useRef, useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import { Form, Card, Row, Col, Table, Button, Modal, Breadcrumb } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';


import { useTable, useFilters, useGlobalFilter } from "react-table";


const Career = () => {


    const categoryRef = useRef();
    const typeRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            category: categoryRef.current.value,
            type: typeRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
        };
        POST("career", formData).then((res) => {
            toast("career Added Successfully")

            categoryRef.current.value = '';
            typeRef.current.value = '';
            titleRef.current.value = '';
            descriptionRef.current.value = '';
            
            fetchData();
        });
    };

    // Edit Funation

    const [careerid, setCareerId] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("career", id, "").then((result) => {
            setCareerId(result[0]);
        });
        handleShow();
    };

    // Edit Ref
    const ecategoryRef = useRef();
    const etypeRef = useRef();
    const etitleRef = useRef();
    const edescriptionRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            category: ecategoryRef.current.value,
            type: etypeRef.current.value,
            title: etitleRef.current.value,
            description: edescriptionRef.current.value,
        };

        PUT("career", id, formData).then((res) => {
            toast("Career Updated Successfully");

            ecategoryRef.current.value = '';
            etypeRef.current.value = '';
            etitleRef.current.value = '';
            edescriptionRef.current.value = '';

            fetchData();
        });
    };


    const [careers, setCareers] = useState([]);

    const fetchData = async () => {
        GET("career").then((result) => {
            setCareers(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const remove = async (event, id) => {
        await DELETE("career/delete", id, "").then((result) => {
            toast("Career deleted! ")
            fetchData();
        })
    };


    const columns = useMemo(
        () => [

            {
                Header: "Description",
                accessor: "description", // Replace with the actual key for your data
            },

            {
                Header: "Category",
                accessor: "category", // Replace with the actual key for your data
            },

            {
                Header: "Type",
                accessor: "type", // Replace with the actual key for your data
            },

            {
                Header: "Title",
                accessor: "title", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => remove(e, row.original.id)} />
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
            data: careers,
            initialState: {
                // Add initial filter states if needed
                filters: [],
                globalFilter: "",
            },
        },
        useFilters, // Add the useFilters hook to enable filtering
        useGlobalFilter // Add the useGlobalFilter hook to enable global filtering
    );

    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Jobs </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>

                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Group controlId="category">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control as="select" ref={categoryRef}>
                                                <option value="">--- Select ---</option>
                                                <option value="Remote"> Remote </option>
                                                <option value="Full Time"> Full Time </option>
                                                <option value="Part Time"> Part Time </option>
                                                <option value="Contract Base"> Contract Base </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="type">
                                            <Form.Label> Type </Form.Label>
                                            <Form.Control as="select" ref={typeRef}>
                                                <option value="">--- Select ---</option>
                                                <option value="Graphic Designing"> Graphic Designing </option>
                                                <option value="Content Writing"> Content Writing </option>
                                                <option value="Marketing"> Marketing </option>
                                                <option value="Sales"> Sales </option>
                                                <option value="Management"> Management </option>
                                                <option value="Data Entry"> Data Entry </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" ref={titleRef} placeholder="Title" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={4} type="text" ref={descriptionRef} placeholder="Description" />
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
                </Col>

                <Col sm={8} className="mt-3">
                    <div className="card">
                        <div className="card-body">
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

            {careerid &&

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" ref={ecategoryRef}>

                                        <optgroup label="Selected">
                                            <option value={careerid && careerid.id}>
                                                {careerid && careerid.category}
                                            </option>
                                        </optgroup>

                                        <optgroup label="Options">
                                            <option value="1"> Remote </option>
                                            <option value="2"> Full Time </option>
                                            <option value="3"> Part Time </option>
                                            <option value="4"> Contract Base </option>
                                        </optgroup>

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="type">
                                    <Form.Label> Type </Form.Label>
                                    <Form.Control as="select" ref={etypeRef}>
                                        <optgroup label="Selected">
                                            <option value={careerid && careerid.id}>
                                                {careerid && careerid.type}
                                            </option>
                                        </optgroup>

                                        <optgroup label="Options">

                                            <option value="1"> Graphic Designing </option>
                                            <option value="2"> Content Writing </option>
                                            <option value="3"> Marketing </option>
                                            <option value="4"> Sales </option>
                                            <option value="5"> Management </option>
                                            <option value="6"> Data Entry </option>
                                        </optgroup>

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" ref={etitleRef} defaultValue={careerid.title} placeholder={careerid.title} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} type="text" ref={edescriptionRef} defaultValue={careerid.description} placeholder={careerid.description} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, careerid.id)} >
                            Submit
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Career