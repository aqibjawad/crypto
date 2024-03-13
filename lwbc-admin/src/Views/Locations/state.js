import React, { useRef, useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PUT } from '../../apicontroller/ApiController'

import { Form, Card, Row, Col, Table, Button, Modal, Breadcrumb } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

import { useTable, useFilters, useGlobalFilter } from "react-table";

const State = () => {

    const countryRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipcodeRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            country: countryRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zipcode: zipcodeRef.current.value,

        };
        POST("state", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                // Clear form fields
                countryRef.current.value ='';
                cityRef.current.value ='';
                stateRef.current.value ='';
                zipcodeRef.current.value ='';
                
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

    const [statee, setStates] = useState([]);
    console.log(statee);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("state", id, "").then((result) => {
            setStates(result);
        });
        handleShow();
    };

    // Edit Ref 
    const ecountryRef = useRef();
    const ecityRef = useRef();
    const estateRef = useRef();
    const ezipcodeRef = useRef();

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = {
            country: ecountryRef.current.value,
            city: ecityRef.current.value,
            state: estateRef.current.value,
            zipcode: ezipcodeRef.current.value,
        };

        PUT("state", id, formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")
                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });
    };


    const [cities, setCity] = useState(false);
    const [countries, setCountry] = useState(false);
    const [states, setState] = useState([]);

    const fetchData = async () => {
        GET("city").then((result) => {
            setCity(result);
        });

        GET("country").then((result) => {
            setCountry(result);
        });

        GET("state").then((result) => {
            setState(result);
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
        GETID("state", id, '').then((result) => {
            setStates(result);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("state/delete", id, "").then((result) => {
            toast("State deleted! ")
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
                Header: "State",
                accessor: "state", // Replace with the actual key for your data
            },

            {
                Header: "Zip Code",
                accessor: "zipcode", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
                        {/* <BsFillPencilFill style={{ color: 'blue', marginLeft: '1rem' }} onClick={(e) => edit(e, row.original.id)} /> */}
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
            data: states,
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

    const [countryId, setCountryId] = useState("")

    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> State </Breadcrumb.Item>
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
                                            <Form.Control className="form-control" as="select" ref={countryRef}
                                            onChange={(e) => setCountryId(e.target.value)}>
                                                <option value=""> --- Select --- </option>
                                                {countries && countries.map((country) => (
                                                    <option value={country.id}>{country.country}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="">
                                            <Form.Label> City </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={cityRef}>
                                                <option value=""> --- Select --- </option>
                                                {cities && cities
                                                .filter((city) => city.ct_id === parseInt(countryId))
                                                .map((city) => (
                                                    <option value={city.id}>{city.city}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="title">
                                            <Form.Label> Area </Form.Label>
                                            <Form.Control type="text" ref={stateRef} placeholder="YOUR AREA" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="title">
                                            <Form.Label> ZipCode </Form.Label>
                                            <Form.Control type="text" ref={zipcodeRef} placeholder="ZIPcode" style={{ '-webkit-appearance': 'none', margin: 0 }} />
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="">

                        <Col md={6}>
                            <Form.Group className="">
                                <Form.Label> Country </Form.Label>
                                <Form.Control className="form-control" as="select" ref={ecountryRef}>

                                    <optgroup label="Selected">
                                        <option value={states && states.id}>
                                            {states && states[0]?.country}
                                        </option>
                                    </optgroup>

                                    <optgroup label="Options">
                                        {states && states.map((country) => (
                                            <option value={country[0]?.id}>{country[0]?.country}</option>
                                        ))}
                                    </optgroup>

                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="">
                                <Form.Label> City </Form.Label>
                                <Form.Control className="form-control" as="select" ref={ecityRef}>
                                    <optgroup label="Selected">
                                        <option value={states && states.id}>
                                            {states && states[0]?.city}
                                        </option>
                                    </optgroup>

                                    <optgroup label="Options">
                                        {states && states.map((cities) => (
                                            <option value={cities[0]?.id}>{cities[0]?.city}</option>
                                        ))}
                                    </optgroup>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label> Area </Form.Label>
                                <Form.Control type="text" ref={ezipcodeRef} defaultvalue={statee?.state} />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label> Zipcode </Form.Label>
                                <Form.Control type="text" ref={estateRef} defaultvalue={statee[0]?.zipcode} />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Button className="btn-custom border-0 mx-3 mt-4" variant="danger" onClick={(e) => eSubmit(e, statee[0]?.id)} >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, statee[0]?.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default State