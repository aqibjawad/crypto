import React, { useState, useEffect } from "react";

import { GET } from "../../apicontroller/ApiController"

import Table from 'react-bootstrap/Table';

const ProfileWitdarwal = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const [witdarwal, setWitdarwal] = useState({});


    const fetchData = async () => {
        GET(`addwallet/${user.authId}`).then((result) => {
            setWitdarwal(result[0])
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id="witdarwal_cards">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Date </th>
                        <th> Witdarwal Amount </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td> {witdarwal.id} </td>
                        <td> {witdarwal.agreement} </td>
                        <td> {witdarwal.wallet_address} </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ProfileWitdarwal