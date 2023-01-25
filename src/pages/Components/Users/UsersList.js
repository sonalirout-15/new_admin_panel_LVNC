import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { loadUserStart } from "../../../Redux/Actions/UserAction";

const UsersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserStart())
    }, [])

    const tableData = useSelector((state) => state?.user?.user?.data?.rows);
    const [data, setData] = useState(tableData);

    useEffect(() => {
        setData(tableData)
    }, [tableData])

    const usersData = []
    data && data.map((item, index) => {
        usersData.push({
            no: item.no = (
                <div>{index + 1}</div>
            ),
            username: item.username,
            email: item.email,
            phonenumber: item.phonenumber,
            address: item.address,
        })
    })

    const datas = {
        columns: [
            {
                label: 'No',
                field: 'no',
                sort: 'asc',
                width: 150
            },
            {
                label: 'User name',
                field: 'username',
                sort: 'asc',
                width: 150
            },

            {
                label: 'Email',
                field: 'email',
                width: 150
            },
            {
                label: 'Mobile No',
                field: 'phonenumber',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Address',
                field: 'address',
                sort: 'asc',
                width: 100
            },
        ],
        rows: usersData
    };

    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <h1>Users List</h1>
                </div>
                <div className="row">
                    <div className="col-lg-20 col-md-20 col-20 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>User Details</h4>
                                <div className="card-header-action">
                                    <Link to={'/dashboard'} className="btn btn-primary"> Back </Link>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <MDBDataTable
                                        striped
                                        bordered
                                        hover
                                        data={datas}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UsersList;