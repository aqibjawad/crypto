import React, { useState, useEffect, useMemo } from "react";

import { GET, DELETE, PUT, GETID } from '../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb, Modal, Button } from "react-bootstrap";

import { AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai';

import { FaTimes } from 'react-icons/fa';

import { toast } from "react-toastify";

import { useTable, useFilters, useGlobalFilter } from "react-table";

const Users = () => {


    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        GET("auth").then((result) => {
            setUsers(result);
        });
    };


    useEffect(() => {
        fetchData();

    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const [usersid, setUserId] = useState([]);

    const delView = async (event, id) => {
        GETID("auth", id, '').then((result) => {
            setUserId(result);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("auth/delete", id, "").then((result) => {
            toast("User deleted! ")
            fetchData();
            handleCloseDel();
        })
    };

    const suspend = async (event, id) => {
        await PUT("auth/status/suspend", id, "").then((result) => {
            toast("User Approve! ")
            fetchData();
        })
    };

    const activate = async (event, id) => {
        await PUT("auth/status/approve", id, "").then((result) => {
            toast("User Suspend! ")
            fetchData();
        })
    };

    const columns = useMemo(
        () => [

            {
                Header: "Name",
                accessor: "firstname", // Replace with the actual key for your data
            },


            {
                Header: "Email",
                accessor: "email", // Replace with the actual key for your data
            },

            {
                Header: "Phone",
                accessor: "phone", // Replace with the actual key for your data
            },

            {
                Header: "Status",
                accessor: "status", // Replace with the actual key for your data
            },

            {
                Header: "Role",
                accessor: "role", // Replace with the actual key for your data
            },

            {
                Header: 'Actions', accessor: 'id',
                Cell: ({ row }) => (
                    <div>
                        {/* <AiFillDelete onClick={(e) => remove(e, user.id)} />  */}
                        <AiFillDelete onClick={(e) => delView(e, row.original.id)} />
                        <FaTimes className="ml-4" onClick={(e) => activate(e, row.original.id)} />
                        <AiOutlineCheckCircle className="ml-4" onClick={(e) => suspend(e, row.original.id)} />
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
            data: users,
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
                        <Breadcrumb.Item active> User </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Col sm={12} className="mt-3">
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
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, users[0]?.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Users