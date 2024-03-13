import React, { useRef, useState, useEffect, useMemo } from "react";

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

import { toast } from "react-toastify";

import { AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

const ShopCategory = () => {

    const [image, setImage] = useState();

    const resetFileInput = () => {
        setImage(null);
    };

    const titleRef = useRef();

    const etitleRef =useRef();

    const submit = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);

        if (image) {
            formData.append("shopcategory", image);
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


        POST("shopcategory", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                titleRef.current.value = '';

                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });
    };

    const [shopcategories, setShopCategories] = useState([]);

    const [shopcategoryid, setShopCategoryId] = useState({});

    // ---------------------- Edit Section Here ------------------------ 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const edit = async (event, id) => {

        GETID("supercategory", id, "").then((result) => {
            setShopCategoryId(result[0]);
        });
        handleShow();
    };

    // Send edited data to the databse finction
    const eSubmit = (event, id) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", etitleRef.current.value);

        if (image) { formData.append("shopcategory", image) };

        PATCH("shopcategory/update", id, formData).then((res) => {
            fetchData();
            toast("Super Category Updated Successfully");
            handleClose();
            setImage(null);
        });
    };


    // ---------------------------- Delete Section Here -----------------------

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("shopcategory", id, '').then((result) => {
            setShopCategoryId(result[0]);
        });
        handleShowDel();
    };

    const fetchData = async () => {
        GET("shopcategory").then((result) => {
            setShopCategories(result);
            console.log(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])


    const columns = useMemo(
        () => [
            // {
            //     Header: "Id",
            //     accessor: "id", // Replace with the actual key for your data
            // },

            {
                Header: "Image",
                accessor: "image",
                Cell: ({ row }) => (
                    <img src={`${process.env.REACT_APP_AWS_URL}${row.original.image}`} alt="Category" height="50px" width="50px" style={{ margin: '0.5rem' }} />
                )
                // Replace with the actual key for your data
            },


            {
                Header: "Category",
                accessor: "title", // Replace with the actual key for your data
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
            data: shopcategories,
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
    )
}

export default ShopCategory