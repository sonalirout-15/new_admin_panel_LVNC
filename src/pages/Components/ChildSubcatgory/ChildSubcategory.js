import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteChildSubcategoryStart, loadChildSubcategoryStart } from "../../../Redux/Actions/ChildSubcategoryAction";
import swal from "sweetalert";

const ChildSubcategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const childSubcategoriesData = useSelector((state) => state?.childSubcatgory?.childSubcatgeory?.rows);

  useEffect(() => {
    dispatch(loadChildSubcategoryStart())
  }, [])
  
  const [data, setData] = useState(childSubcategoriesData)
  useEffect(() => {
    setData(childSubcategoriesData)
  }, [childSubcategoriesData])

  const childsubcategoryData = []
  data && data.map((item , index) => {
    childsubcategoryData.push({
      no:item.no = (
        <div>{index+1}</div>
      ),
      Subcategory_ref_id: item.Subcategory_ref_id,
      title: item.title,
      Description: item.Description,
      image:<img src={item.image} style={{ height: "60px" }}></img>,
      status: item.status,
      action: item.action = (
       <>
        <button
              className="btn btn-primary btn-sm ml-2"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editChildSubcategory/${item.id}`)}
             >
              <i className="far fa-edit"></i>
           </button>
           <button
              className="btn btn-danger btn-sm ml-2"
              data-toggle="tooltip"
              title="Delete"
              onClick={() => handleDelete(item.id)}
             >
              <i className="fas fa-trash"></i>
           </button>
            <button
              className="btn btn-info btn-sm ml-3"
              data-toggle="tooltip"
              title="View"
              onClick={() => history.push(`viewChildSubcategory/${item.id}`)}
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
        label: 'Subcategory Ref Id',
        field: 'Subcategory_ref_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Title',
        field: 'title',
        width: 150
      },
      {
        label: 'Description',
        field: 'Description',
        width: 150
      },
      {
        label: 'Image',
        field: 'image',
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
    rows: childsubcategoryData
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  }).then((willDelete) => {
      if (willDelete) {
          dispatch(deleteChildSubcategoryStart(id))
          swal(" Childsubcategory deleted successfully!", {
              icon: "success",
          });
      } else {
          swal("Your data is safe!");
      }
  });
  }
  
  return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Child Subcategories</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Child Subcategories Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addChildSubcategory'} className="btn btn-primary"> + New </Link>
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

export default ChildSubcategory;