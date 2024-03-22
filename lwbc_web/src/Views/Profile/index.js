import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table';

import "./index.css"

import { GET } from "../../apicontroller/ApiController"

import ProfileWitdarwal from './Witdarwal.profile';

const Account = () => {

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];

    const [recharge, setRecharge] = useState([]);

    const fetchData = async () => {
        GET(`recharge/${user.authId}`).then((result) => {
            setRecharge(result)
        })
    };

    useEffect(() => {
        fetchData()
    }, [])
    

    return (
        <>
            <div className='Dahboard mt-5'>
                <div className='card'>
                    <form className="card-body">

                        <div className="row">
                            <div className="d-flex form-group col-sm-6" style={{ fontSize: '20px', marginLeft: "15rem" }}>
                                <strong for="exampleInputEmail1">
                                    Hello {user.name}
                                    <span className="text-danger">*</span>
                                </strong>

                                <div style={{ marginLeft: '20rem' }}>
                                    <strong>
                                        {user.email}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-center mt-5'>
                                Your Deposits:
                            </h1>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th> Date </th>
                                        <th> Deposit Amount </th>
                                        <th> Total Amount </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recharge && recharge.map((recharges) => (

                                        
                                        <tr>
                                            <td> {recharges.id} </td>
                                            <td> {recharges.created_at.split(' ')[0]} </td>
                                            <td> {recharges.deposit} </td>
                                            <td> {recharges.total} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <h1 className='text-center mt-5'>
                                Your Witdarwals:
                            </h1>

                            <ProfileWitdarwal />
                        </div>
                    </form>
                </div>
            </div>
        </>


    )
}
export default Account