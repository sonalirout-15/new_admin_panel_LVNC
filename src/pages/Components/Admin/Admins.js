import React, { useEffect, useState } from "react";
import {  useHistory } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { loadAdminStart } from "../../../Redux/Actions/AdminActions";

const Admins = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadAdminStart())
  }, [])

  const tableData = useSelector((state) => state?.admin?.admin?.rows)
  const [data, setData] = useState(tableData);

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const adminData = []
  data && data.map((item , index) => {
    adminData.push({
      no:item.no =  (
        <div>{index+1}</div>
      ),
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      gender: item.gender,
      address : item.address,
      image:<img src={item.image} style={{ height: "60px" }}></img>,
      status: item.status,
      action: item.action = (
       <>
        <a
              className="btn btn-primary btn-sm ml-2"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editAdmin/${item.id}`)}
             >
              <i className="far fa-edit"></i>
           </a>{" "}
            <button
              className="btn btn-info btn-sm ml-3"
              data-toggle="tooltip"
              title="View"
              onClick={() => history.push(`viewAdmin/${item.id}`)}
              >
                <i className="fas fa-eye"></i>
            </button>
       </>
      )
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
        sort: 'asc',
        width: 270
      },
      {
        label: 'Mobile No',
        field: 'mobile',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Gender',
        field: 'gender',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'image',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Action',
        field: 'action'
      }
    ],
    rows: adminData
  };



  return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Admins</h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-16 col-16 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4>Admin Details</h4>
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


export default Admins;