import React, { useState, useEffect, useRef, useMemo } from "react";

import { PUT, GET, DELETE, GETID } from '../../apicontroller/ApiController'

import {
    InputGroup,
    FormControl,
    Form,
    Card,
    Row,
    Col, Table, Button, Modal, Breadcrumb
} from "react-bootstrap";

import { AiFillDelete, AiOutlineDelete, AiFillEye } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useTable, useFilters, useGlobalFilter } from "react-table";


const ProductDetails = () => {

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];

    const [images, setImages] = useState();

    const esupercategoryRef = useRef();
    const ecategoryRef = useRef();
    // const eproductRef = useRef();
    const especificationsRef = useRef();


    const [subcategoryid, setSubCategoryId] = useState({});


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Edit FUNCTION
    const edit = async (event, id) => {
        GETID("subcategory", id, "").then((result) => {
            setSubCategoryId(result);
        });
        handleShow();
    };

    // Category Details
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    //View FUNCTION
    const view = async (event, id) => {
        GETID("subcategory", id, "").then((result) => {
            setSubCategoryId(result[0]);
        });
        handleShow1();
    };

    const esubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("supercategory", esupercategoryRef.current.value);
        formData.append("category", ecategoryRef.current.value);
        // formData.append("product", eproductRef.current.value);
        formData.append("specifications", especificationsRef.current.value);

        for (let index = 0; index < images.length; index++) {
            formData.append("subcategory[]", images[index]);
        }

        PUT("subcategory/update", id, formData).then((res) => {
            toast("Sub Category Updated Successfully");
            fetchData();
            handleClose();
        });
    };


    const [subcategories, setSubCategories] = useState([]);

    const [supercategories, setSuperCategories] = useState([]);

    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        GET("subcategory").then((result) => {
            setSubCategories(result);
        });

        GET("supercategory").then((result) => {
            setSuperCategories(result);
        });

        GET("category").then((result) => {
            setCategories(result);
        });

    };


    useEffect(() => {
        fetchData();
        setShow(null);
    }, [])

    const remove = async (event, id) => {
        DELETE("subcategory", id, "").then((result) => {
            toast("Product Details deleted! ")
            fetchData();
        })
    };

    const removePicture = async (event, id) => {
        DELETE("subcategory/delete", id, "").then((result) => {
            toast("Product Images deleted! ")
        })
    };


    const columns = useMemo(
        () => {
            const commonColumns = [
                // {
                //     Header: "Images",
                //     accessor: "subcategory_image",
                //     Cell: ({ row }) => (
                //         <img src={`${process.env.REACT_APP_AWS_URL}${row.original.subcategory_image}`} alt="Category" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                //     ) // Replace with the actual key for your data
                // },

                {
                    Header: "Serial No",
                    accessor: "SerialNo", // Replace with the actual key for your data
                },

                {
                    Header: "Main Product",
                    accessor: "SuperCategory", // Replace with the actual key for your data
                },

                {
                    Header: "Product",
                    accessor: "Category", // Replace with the actual key for your data
                },

                {
                    Header: "Product Specifications",
                    accessor: "specifications", // Replace with the actual key for your data
                },

                // {
                //     Header: "Product Features",
                //     accessor: "product", // Replace with the actual key for your data
                // },
            ];

            // Conditionally include the "Actions" column based on some condition
            if (user.role === 'admin') {
                commonColumns.push({
                    Header: 'Actions',
                    accessor: 'id',
                    Cell: ({ row }) => (
                        <div>
                            <AiFillDelete onClick={(e) => remove(e, row.original.id)} />
                            <AiOutlineDelete onClick={(e) => removePicture(e, row.original.id)} />
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
            data: subcategories, // This is where the error might originate
            initialState: {
                // Add initial filter states if needed
                filters: [],
                globalFilter: "",
            },
        },
        useFilters,
        useGlobalFilter
    );


    const { globalFilter } = state;

    return (
        <div>
            <Row>
                <Col sm={12} className="mt-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                        <Breadcrumb.Item active> Product Details </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col sm={12} className="mt-1">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/details" className="btn btn-danger">
                                Enter Details
                            </Link>
                        </div>
                    </div>
                </Col>

                <Col sm={12} className="mt-3">
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="">

                        <Col sm={12}>
                            <div>
                                {subcategoryid?.images?.map((images, index) => (
                                    <img style={{ objectFit: 'contain', width: "30%" }} key={index} src={`${process.env.REACT_APP_AWS_URL}${images.images}`} />
                                ))}
                            </div>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="">
                                <Form.Label> Category </Form.Label>
                                <Form.Control className="form-control" as="select" ref={esupercategoryRef}  >

                                    <optgroup label="Selected">
                                        <option value={supercategories && supercategories.spc_id}>
                                            {supercategories[0] && supercategories[0].title}
                                        </option>
                                    </optgroup>

                                    <optgroup label="Options">
                                        {supercategories.map((supercateg) => (
                                            <option value={supercateg.id}>{supercateg.title}</option>
                                        ))}
                                    </optgroup>

                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="">
                                <Form.Label> Product </Form.Label>
                                <Form.Control className="form-control" as="select" ref={ecategoryRef}  >

                                    <optgroup label="Options">
                                        <option value={categories && categories.ctg_id}>
                                            {categories[0] && categories[0].title}
                                        </option>
                                    </optgroup>

                                    <optgroup label="Selected">

                                        {categories.map((category) => (
                                            <option value={category.id}>{category.title}</option>
                                        ))}
                                    </optgroup>

                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Label htmlFor="basic-url"> Image </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control type="file" onChange={(e) => { setImages([...e.target.files]) }} multiple accept="image/*" />
                            </InputGroup>
                        </Col>

                        {/* <Col md={12}>
                            <Form.Label htmlFor="basic-url"> Product Details </Form.Label>
                            <FormControl as="textarea" rows="3" ref={eproductRef} defaultValue={subcategories[0]?.product} className="form-control" />
                        </Col> */}

                        <Col md={12}>
                            <Form.Label htmlFor="basic-url"> Product Specifications </Form.Label>
                            <FormControl as="textarea" rows="4" ref={especificationsRef} defaultValue={subcategoryid.specifications} className="form-control" />
                        </Col>
                    </Row>
                </Modal.Body>
                <div className="my-2 pl-3 mb-5">
                    <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => esubmit(e, subcategories[0]?.id)} >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default ProductDetails