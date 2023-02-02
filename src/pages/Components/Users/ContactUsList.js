import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';
import { Link } from "react-router-dom";
import { loadUserContactUsStart } from "../../../Redux/Actions/UserAction";


const ContactUsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserContactUsStart())
    }, [])

    const tableData = useSelector((state) => state?.user?.contactUsData)
    const [data, setData] = useState(tableData);

    useEffect(() => {
        setData(tableData)
    }, [tableData])

    const usersData = []
    data && data.map((item , index) => {
        usersData.push({
        no:item.no = (
          <div>{index+1}</div>
        ),
        name: item.name,
        email: item.email,
        title:item.title,
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
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
      
        {
          label: 'Email',
          field: 'email',
          width: 150
        },
        {
          label: 'Message',
          field: 'title',
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
                <h1>Users ContactUs List</h1>
            </div>
            <div className="row">
                <div className="col-lg-20 col-md-20 col-20 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>User Contact Us Details</h4>
                            <div className="card-header-action">
                                <Link to={'/dashboard'} className="btn btn-primary"> Back </Link>
                            </div>
                        </div>
                        <div className="card-body p-2">
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

export default ContactUsList;