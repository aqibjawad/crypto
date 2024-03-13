import React, { useState, useEffect, useMemo } from "react";

import { GETID, GET, DELETE } from '../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb, Modal, Button } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';
import { toast } from "react-toastify";

import { useTable, useFilters, useGlobalFilter } from "react-table";

const Reviews = () => {


    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        GET("reviews").then((result) => {
            setReviews(result);
        });

    };

    useEffect(() => {
        fetchData();

    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("reviews/find/delete", id, '').then((result) => {
            setReviews(result);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("reviews/delete", id, "").then((result) => {
            toast("Reviews deleted! ")
            fetchData();
        })
    };

    
    const columns = useMemo(
        () => [

            {
                Header: "User",
                accessor: "userid", // Replace with the actual key for your data
            },

            {
                Header: "Title",
                accessor: "ReviewTitle", // Replace with the actual key for your data
            },

            {
                Header: "Description",
                accessor: "description", // Replace with the actual key for your data
            },

            {
                Header: "Category",
                accessor: "ProductName", // Replace with the actual key for your data
            },

            {
                Header: "Main Product",
                accessor: "MainProduct", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
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
            data: reviews,
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
            <Row>
                <Col sm={12} className="mt-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                        <Breadcrumb.Item active> Reviews </Breadcrumb.Item>
                    </Breadcrumb>
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, reviews[0]?.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Reviews