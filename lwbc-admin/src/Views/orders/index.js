import React, { useState, useEffect, useMemo } from 'react'
import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

import { GET, PUT } from "../../apicontroller/ApiController"

import { FaShippingFast } from 'react-icons/fa';

import { FcApprove } from 'react-icons/fc';

import { GrDeliver } from 'react-icons/gr';

import { toast } from "react-toastify";

import { useTable, useFilters, useGlobalFilter } from "react-table";


const Order = () => {

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];


    const [checkout, setCheckOut] = useState([]);

    const statusApprove = async (event, id) => {
        await PUT("checkout/status/approve", id).then((result) => {
            toast("Order  Approve! ")
            fetchData();
        })
    };

    const statusShipped = async (event, id) => {
        await PUT("checkout/status/shipping", id).then((result) => {
            toast("Order  Shipping! ")
            fetchData();
        })
    };


    const statusDeliver = async (event, id) => {
        await PUT("checkout/status/deliever", id).then((result) => {
            toast("Order  Deliever! ")
            fetchData();
        })
    };


    const [userapi, setUserApi] = useState([]);

    const fetchData = async () => {
        GET("checkout").then((result) => {
            setCheckOut(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    const columns = useMemo(
        () => {
            const commonColumns = [

                {
                    Header: "Name",
                    accessor: "Name", // Replace with the actual key for your data
                },

                {
                    Header: "Email",
                    accessor: "email", // Replace with the actual key for your data
                },

                {
                    Header: "Category",
                    accessor: "MainProduct", // Replace with the actual key for your data
                },

                {
                    Header: "Product",
                    accessor: "ProductName", // Replace with the actual key for your data
                },

                {
                    Header: "Country / City",
                    accessor: "country / city", // Replace with the actual key for your data
                },

                {
                    Header: "Area",
                    accessor: "area", // Replace with the actual key for your data
                },

                {
                    Header: "Street",
                    accessor: "street", // Replace with the actual key for your data
                },

                {
                    Header: "Phone",
                    accessor: "phone", // Replace with the actual key for your data
                },

                {
                    Header: "Image",
                    accessor: "image",
                    Cell: ({ row }) => (
                        <img src={`${process.env.REACT_APP_AWS_URL}${row.original.image}`} alt="Category" height="30px" width="30px" style={{ margin: '0.5rem' }} />
                    ) // Replace with the actual key for your data
                },

                {
                    Header: "Status",
                    accessor: "status", // Replace with the actual key for your data
                },


            ];

            // Conditionally include the "Actions" column based on some condition
            if (user.role === 'admin') {
                commonColumns.push({
                    Header: 'Actions',
                    accessor: 'id',
                    Cell: ({ row }) => (
                        <div>
                            <FaShippingFast />
                            <FcApprove style={{ color: 'blue', marginLeft: '1rem' }} />
                            <GrDeliver style={{ color: 'blue', marginLeft: '1rem' }} />
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
            data: checkout,
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
            <Col sm={12} className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard"> Dashboard </Breadcrumb.Item>
                    <Breadcrumb.Item active> Order </Breadcrumb.Item>
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
    )
}

export default Order