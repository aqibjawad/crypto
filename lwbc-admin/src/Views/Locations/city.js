import React, { useRef, useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import { Form, Card, Row, Col, Table, Button, Modal, Breadcrumb } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

import { useTable, useFilters, useGlobalFilter } from "react-table";

const City = () => {


    const countryRef = useRef();
    const cityRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            country: countryRef.current.value,
            city: cityRef.current.value,

        };
        POST("city", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                // clearing the form fields
                countryRef.current.value ='';
                cityRef.current.value ='';  
                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });
    };

    // Edit Funation



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cityid, setCityId] = useState([]);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("city", id, "").then((result) => {
            setCityId(result[0]);
        });
        handleShow();
    };

    // Edit Ref
    const ecountryRef = useRef();
    const ecityRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            country: ecountryRef.current.value,
            city: ecityRef.current.value,
        };

        PUT("city", id, formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")
                fetchData();
                handleClose();
            } else {
                toast.error(res.sqlMessage)
            }
        });
    };


    const [cities, setCity] = useState([]);
    const [countries, setCountry] = useState([]);

    const fetchData = async () => {
        GET("city").then((result) => {
            setCity(result);
        });

        GET("country").then((result) => {
            setCountry(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    // ------------------------- Del Model --------------------------------------------------//

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("city", id, '').then((result) => {
            setCityId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("city/delete", id, "").then((result) => {
            toast("City deleted! ")
            fetchData();
        })
    };

    const columns = useMemo(
        () => [
            // {
            //     Header: "Id",
            //     accessor: "id", // Replace with the actual key for your data
            // },
            {
                Header: "Country",
                accessor: "country", // Replace with the actual key for your data
            },

            {
                Header: "City",
                accessor: "city", // Replace with the actual key for your data
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
            data: cities,
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
                    <Breadcrumb.Item active> City </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>

                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Group className="">
                                            <Form.Label> Country </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={countryRef}>
                                                <option value=""> --- Select --- </option>
                                                {countries && countries.map((country) => (
                                                    <option value={country.id}>{country.country}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="title">
                                            <Form.Label> City </Form.Label>
                                            <Form.Control type="text" ref={cityRef} placeholder="City" />
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
                            {/* Search Input */}
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

            {cityid &&
                <div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> Edit Details </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className="">

                                <Col md={6}>
                                    <Form.Group className="">
                                        <Form.Label> Country (This is Your Data Kindly select Option for editing) </Form.Label>
                                        <Form.Control className="form-control" as="select" ref={ecountryRef}>

                                            <optgroup label="Selected">
                                                <option value={cityid && cityid.id}>
                                                    {cityid && cityid.country}
                                                </option>
                                            </optgroup>

                                            <optgroup label="Options">
                                                {countries && countries.map((country) => (
                                                    <option value={country.id}>{country.country}</option>
                                                ))}
                                            </optgroup>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="title">
                                        <Form.Label> City </Form.Label>
                                        <Form.Control type="text" ref={ecityRef} placeholder={cityid.city} defaultValue={cityid.city} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <div className="my-2 pl-3 mb-5">
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, cityid?.id)} >
                                Submit
                            </Button>
                        </div>
                    </Modal>
                </div>
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, cityid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default City