import React, { useState, useEffect } from "react";

import { GET } from "../../apicontroller/ApiController"

import Table from 'react-bootstrap/Table';

const ProfileWitdarwal = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const [witdarwal, setWitdarwal] = useState([]);


    const fetchData = async () => {
        GET(`addwallet/${user.authId}`).then((result) => {
            setWitdarwal(result)
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Date </th>
                        <th> Witdarwal Amount </th>
                    </tr>
                </thead>

                <tbody>
                    {witdarwal && witdarwal.map((witdarwals) => (
                        <tr>
                            <td> {witdarwals.id} </td>
                            <td> {witdarwals.agreement} </td>
                            <td> {witdarwals.wallet_address} </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileWitdarwal