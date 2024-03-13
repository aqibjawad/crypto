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

const Product = () => {

    const [image, setImage] = useState();

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];


    // Submit Values
    const supercategoryRef = useRef();
    const titleRef = useRef();
    const priceRef = useRef();
    const featureRef = useRef();
    const currencyRef = useRef();
    const upcomingRef = useRef();
    const serialnoRef = useRef();
    const discountRef = useRef();


    // Submit Functions
    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("supercategory", supercategoryRef.current.value);
        formData.append("title", titleRef.current.value);
        formData.append("price", priceRef.current.value);
        // formData.append("description", descriptionRef.current.value);
        formData.append("currency", currencyRef.current.value);
        formData.append("feature", featureRef.current.checked ? '1' : '0');
        formData.append("upcoming", upcomingRef.current.checked ? '1' : '0');
        formData.append("serialno", serialnoRef.current.value);
        formData.append("discount", discountRef.current.value);

        if (image) formData.append("category", image);

        if (!titleRef.current.value) {
            toast.error('Category Name field is required.', {
                // Use custom class for toast container
                className: 'custom-toast-container',
                // Use custom class for toast message
                bodyClassName: 'custom-toast-message'
            });
            return; // Prevent form submission
        }

        if (!priceRef.current.value) {
            toast.error('Category Name field is required.', {
                // Use custom class for toast container
                className: 'custom-toast-container',
                // Use custom class for toast message
                bodyClassName: 'custom-toast-message'
            });
            return; // Prevent form submission
        }

        if (!discountRef.current.value) {
            toast.error('Category Name field is required.', {
                // Use custom class for toast container
                className: 'custom-toast-container',
                // Use custom class for toast message
                bodyClassName: 'custom-toast-message'
            });
            return; // Prevent form submission
        }

        if (!currencyRef.current.value) {
            toast.error('Category Name field is required.', {
                // Use custom class for toast container
                className: 'custom-toast-container',
                // Use custom class for toast message
                bodyClassName: 'custom-toast-message'
            });
            return; // Prevent form submission
        }


        POST("category", formData).then((res) => {
            if (res.error === false) {
                toast("Added Done")

                supercategoryRef.current.value = '';
                titleRef.current.value = '';
                priceRef.current.value = '';
                currencyRef.current.value = '';
                featureRef.current.checked = '';
                upcomingRef.current.checked = '';
                serialnoRef.current.value = '';
                fetchData();
            } else {
                toast.error(res.sqlMessage)
            }
        });

        setImage(null);
    };

    // Model Handle close and open
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, setCategoryId] = useState([]);

    //Edit FUNCTION
    const edit = async (event, id) => {

        GETID("category/edit", id, "").then((result) => {
            setCategoryId(result);
        });
        handleShow();
        setCategoryId(null);
    };

    // Edit Ref Submit Values
    const esupercategoryRef = useRef();
    const etitleRef = useRef();
    const epriceRef = useRef();
    const efeatureRef = useRef();
    const eupcomingRef = useRef();
    const ecurrencyRef = useRef();
    const eserialnoRef = useRef();
    const ediscountRef = useRef();

    const eSubmit = (event, id) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("supercategory", esupercategoryRef.current.value);
        formData.append("title", etitleRef.current.value);
        formData.append("price", epriceRef.current.value);
        formData.append("feature", efeatureRef.current.checked ? '1' : '0');
        formData.append("upcoming", eupcomingRef.current.checked ? '1' : '0');
        formData.append("serialno", eserialnoRef.current.value);
        formData.append("discount", ediscountRef.current.value);
        formData.append("currency", ecurrencyRef.current.value);


        if (image) formData.append("category", image);

        PUT("category/update", id, formData).then((res) => {

            fetchData();
            toast("Product Updated Successfully");
            handleClose();
        });
    };

    // ---------------- Get Data ------------------------
    const [supercategories, setSuperCategories] = useState([]);

    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        GET("supercategory").then((result) => {
            setSuperCategories(result);
        });

        GET("category").then((result) => {
            setCategories(result);
        });
    };


    useEffect(() => {
        fetchData();
    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("category/finddelete", id, '').then((result) => {
            setCategoryId(result);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("category/delete", id, "").then((result) => {
            toast("Product deleted! ")
            fetchData();
        })
    };

    const columns = useMemo(
        () => {
            const commonColumns = [

                {
                    Header: "Serial#",
                    accessor: "SerialNo", // Replace with the actual key for your data
                },

                {
                    Header: "Category",
                    accessor: "SuperCatgory", // Replace with the actual key for your data
                },

                {
                    Header: "Image",
                    accessor: "image",
                    Cell: ({ row }) => (
                        <img src={`${process.env.REACT_APP_AWS_URL}${row.original.image}`} alt="Category" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                    )
                    // Replace with the actual key for your data
                },

                {
                    Header: "Product",
                    accessor: "title", // Replace with the actual key for your data
                },

                {
                    Header: "Price",
                    accessor: "price", // Replace with the actual key for your data
                },

                {
                    Header: "Currency",
                    accessor: "currency", // Replace with the actual key for your data
                },

                {
                    Header: "Feature",
                    accessor: "feature", // Replace with the actual key for your data
                },

                {
                    Header: "Upcoming",
                    accessor: "upcoming", // Replace with the actual key for your data
                },


                {
                    Header: "Discount",
                    accessor: "discount", // Replace with the actual key for your data
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
            data: categories,
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

    // const [selectedCategoryId, setSelectedCategoryId] = useState(category && category.id)


    return (
        <div>

            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Product </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            <Row>
                <Col sm={12}>
                    <Card className="">
                        <Card.Body>
                            <Form>
                                <div className="row">

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Main Product </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={supercategoryRef}>
                                                <option value=""> --- Select --- </option>
                                                {supercategories.map((supercategory) => (
                                                    <option value={supercategory.id}>{supercategory.title}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Product </Form.Label>
                                            <Form.Control ref={titleRef} type="text" placeholder="Product" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Currency </Form.Label>
                                            <Form.Control className="form-control" as="select" ref={currencyRef}>
                                                <option value=""> --- Select --- </option>
                                                <option value="USD - $"> USD - $ </option>
                                                <option value="AUD - $"> AUD - $ </option>
                                                <option value="CAD - $"> CAD - $ </option>
                                                <option value="GGP - £"> GGP - £ </option>
                                                <option value="DZD - DA"> DZD - DA </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Product Price </Form.Label>
                                            <Form.Control ref={priceRef} type="text" placeholder="Product" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Product Price Discount (%) </Form.Label>
                                            <Form.Control ref={discountRef} type="text" placeholder="Discount" />
                                        </Form.Group>
                                    </Col>

                                    {/* <Col md={12}>
                                        <Form.Group className="">
                                            <Form.Label> Description </Form.Label>
                                            <Form.Control as="textarea" rows="4" ref={descriptionRef} type="text" />
                                        </Form.Group>
                                    </Col> */}

                                    <Col md={4}>
                                        <Form.Group className="">
                                            <Form.Label> Serial No </Form.Label>
                                            <Form.Control ref={serialnoRef} type="text" placeholder="#SK09" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={3}>
                                        <Form.Group className="">
                                            <Form.Label> Image </Form.Label>
                                            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        </Form.Group>
                                    </Col>

                                    <Col md={2}>
                                        <Form.Group className="mt-4" controlId="formBasicCheckbox">
                                            <Form.Check ref={featureRef} type="checkbox" label="Features" />
                                        </Form.Group>
                                    </Col>

                                    <Col md={2}>
                                        <Form.Group className="mt-4" controlId="formBasicUpComingCheckbox">
                                            <Form.Check ref={upcomingRef} type="checkbox" label="Upcoming" />
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

            {category &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Details </Modal.Title>
                    </Modal.Header>

                    <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                        <img src={`${process.env.REACT_APP_AWS_URL}${category[0]?.image}`} alt="Category" height="20%" width="20%" style={{ margin: '0.5rem' }} />
                    </div>
                    <Modal.Body>
                        <Row className="">

                            <Col md={6}>
                                <Form.Group className="">
                                    <Form.Label> Category </Form.Label>
                                    <Form.Control className="form-control" as="select" ref={esupercategoryRef} value={category && category.spc_id} >

                                        <optgroup label="Selected" >
                                            <option value={category.spc_id}>
                                                {category[0]?.SuperCatgory}
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

                            <Col md={4}>
                                <Form.Group className="">
                                    <Form.Label> Currency </Form.Label>
                                    <Form.Control className="form-control" as="select" ref={ecurrencyRef}>
                                        <option value=""> --- Select --- </option>
                                        <option value="USD - $"> USD - $ </option>
                                        <option value="AUD - $"> AUD - $ </option>
                                        <option value="CAD - $"> CAD - $ </option>
                                        <option value="GGP - £"> GGP - £ </option>
                                        <option value="DZD - DA"> DZD - DA </option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Product Price </Form.Label>
                                <FormControl ref={epriceRef} className="form-control" defaultValue={category[0]?.price} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Title </Form.Label>
                                <FormControl ref={etitleRef} className="form-control" defaultValue={category[0]?.title} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Serial Number </Form.Label>
                                <FormControl ref={eserialnoRef} className="form-control" defaultValue={category[0]?.serialno} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Discount </Form.Label>
                                <FormControl ref={ediscountRef} className="form-control" defaultValue={category[0]?.discount} />
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Image </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </InputGroup>
                            </Col>

                            {/* <Col md={12}>
                                <Form.Label htmlFor="basic-url"> Description </Form.Label>
                                <FormControl as="textarea" rows="4" ref={edescriptionRef} className="form-control" />
                            </Col> */}

                            <Col md={6}>
                                <Form.Group className="mt-4" controlId="formBasicHeaderCheckbox">
                                    <Form.Check ref={efeatureRef} type="checkbox" label="Features" />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mt-4" controlId="formBasicTopCheckbox">
                                    <Form.Check ref={eupcomingRef} type="checkbox" label="Up Coming" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <div className="my-2 pl-3 mb-5">
                        <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => eSubmit(e, category[0]?.id)} >
                            Submit
                        </Button>
                    </div>
                </Modal>
            }

            {category &&
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
                                <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, category[0]?.id)} >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }

        </div>
    )
}

export default Product