import React, { useRef, useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { POST, GET, DELETE, GETID, PATCH } from '../../apicontroller/ApiController'

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

import "./listing.css"

import { FaTshirt } from "react-icons/fa";

import { Auth } from "../../context/Auth.Context";

const MainProduct = () => {

    const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

    const [image, setImage] = useState();
    const resetFileInput = () => {
        setImage(null);
    };


    const titleRef = useRef();
    const headerRef = useRef();
    const topRef = useRef();

    const etitleRef = useRef();
    const eheaderRef = useRef();
    const etopRef = useRef();

    const [supercategories, setSuperCategories] = useState([]);

    const submit = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("header", headerRef.current.checked ? '1' : '0');
        formData.append("top", topRef.current.checked ? '1' : '0');

        if (image) {
            formData.append("supercategory", image);
            resetFileInput();
        }

        if (!titleRef.current.value) {
            toast.error('Category Name field is required.', {
                // Use custom class for toast container
                className: 'custom-toast-container',
                // Use custom class for toast message
                bodyClassName: 'custom-toast-message'
            });
            return; // Prevent form submission
        }


        POST("supercategory", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                titleRef.current.value = '';
                headerRef.current.checked = '';
                topRef.current.checked = '';

                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });
    };



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [supercategoryid, setSuperCategoryId] = useState({});

    //Edit FUNCTION
    const edit = async (event, id) => {

        GETID("supercategory", id, "").then((result) => {
            setSuperCategoryId(result[0]);
        });
        handleShow();
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", etitleRef.current.value);
        formData.append("header", eheaderRef.current.checked ? '1' : '0');
        formData.append("top", etopRef.current.checked ? '1' : '0');

        if (image) { formData.append("supercategory", image) };

        PATCH("supercategory/update", id, formData).then((res) => {
            fetchData();
            toast("Super Category Updated Successfully");
            handleClose();
            setImage(null);
        });
    };
    const fetchData = async () => {
        GET("supercategory").then((result) => {
            setSuperCategories(result);
        });
    };


    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("supercategory", id, '').then((result) => {
            setSuperCategoryId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        DELETE("supercategory/delete", id, "").then((result) => {
            fetchData();
            toast("Your Category is deleted");
        });
        handleCloseDel();
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
                        <img src={`${process.env.REACT_APP_AWS_URL}${row.original.image}`} alt="Category" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                    )
                },
                {
                    Header: "Category",
                    accessor: "title",
                },
                {
                    Header: "In Header",
                    accessor: "header",
                },
                {
                    Header: "Top Category",
                    accessor: "top",
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
            data: supercategories,
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
                                        <Form.Label htmlFor="basic-url"> Category Name </Form.Label>
                                        <InputGroup className="mb-3" required >
                                            <FormControl type="text" ref={titleRef} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        </InputGroup>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check ref={headerRef} type="checkbox" label="Header" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={8}>
                                        <Form.Group className="mb-3" controlId="formBasicTopCategoryCheckbox">
                                            <Form.Check ref={topRef} type="checkbox" label="Top Category" />
                                        </Form.Group>
                                    </Col>

                                    {/* <Col md={12}>
                                        <Form.Label htmlFor="basic-url"> Types </Form.Label>
                                        <Form.Control className="form-control mb-3" as="select">
                                            <option value=""> --- Select --- </option>
                                            <option value="Apparel">  Apparel </option>
                                            <option value="Art"> Art </option>
                                            <option value="Electronics"> Electronics </option>
                                            <option value="Food & Beverages"> Food & Beverages </option>
                                            <option value="Health & Beauty"> Health & Beauty </option>
                                            <option value="Health Care"> Health Care </option>
                                            <option value="Home & Garden"> Home & Garden </option>
                                            <option value="Sporting Goods"> Sporting Goods </option>
                                            <option value="Others"> Others </option>
                                        </Form.Control>
                                    </Col> */}

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

            {supercategoryid &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>
                    <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                        <img src={`${process.env.REACT_APP_AWS_URL}${supercategoryid.image}`} alt="Category" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    </div>
                    <Modal.Body>
                        <Row className="">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Title </Form.Label>
                                <FormControl ref={etitleRef} className="form-control" defaultValue={supercategoryid.title} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicHeaderCheckbox">
                                    <Form.Check ref={eheaderRef} type="checkbox" label="Header" defaultValue={supercategoryid.header} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicTopCheckbox">
                                    <Form.Check ref={etopRef} type="checkbox" label="Top Category" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, supercategoryid.id)} >
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, supercategoryid.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MainProduct