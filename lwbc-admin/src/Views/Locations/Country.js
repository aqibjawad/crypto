import React, { useRef, useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import { useTable, useFilters, useGlobalFilter } from "react-table";

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


const Country = () => {


    const countryRef = useRef();

    const ecountryRef = useRef();


    const [countries, setCountry] = useState([]);

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            country: countryRef.current.value,
        };
        POST("country", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done");
                // Clear the form fields
                countryRef.current.value = '';
                fetchData();
            } else {
                toast.error(res.sqlMessage);
            }
        });
    };
    
    const [country, setCountries] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (countries !== null) {
          // Render the modal or form with the data from `countries`
          setShow(true)
        }
      };


    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("country", id, '').then((result) => {
            setCountries(result);
            handleShow();
        });
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            country: ecountryRef.current.value,
        };

        PUT("country", id, formData).then((res) => {
            toast("country Updated Successfully");
            handleClose();
            fetchData();
        });
    };

    const fetchData = async () => {
        GET("country").then((result) => {
            setCountry(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    
    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("country", id, '').then((result) => {
            setCountries(result[0]);
            handleShowDel();
        });
    };

    const remove = async (event, id) => {
        DELETE("country/delete", id, '').then((result) => {
            fetchData();
            handleCloseDel();
            toast("country Deleted");
        });
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
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
                        <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, row.original.id)} />
                    </div>
                )
            }
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
            data: countries,
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
                    <Breadcrumb.Item active> Country </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Country </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="text" ref={countryRef} />
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
                                    {headerGroups.map((headerGroup, index) => (
                                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                            {headerGroup.headers.map((column, index) => (
                                                <th {...column.getHeaderProps()} key={index}>{column.render("Header")}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, index) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} key={index}>
                                                {row.cells.map((cell, index) => (
                                                    <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="">

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label> Country </Form.Label>
                                <Form.Control type="text" ref={ecountryRef} defaultValue={country&&country[0]?.country} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, country[0]?.id)} >
                        Submit
                    </Button>
                </div>
            </Modal>

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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, country.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Country