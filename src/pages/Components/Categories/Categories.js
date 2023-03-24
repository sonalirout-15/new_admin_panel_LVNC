import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteCategoryStart, loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import swal from "sweetalert";

const Categories = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const categoriesData = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows);
  const [data, setData] = useState(categoriesData)

  useEffect(() => {
    dispatch(loadCategoryStart())
  }, [])
  
  
  useEffect(() => {
    setData(categoriesData)
  }, [categoriesData])

  
  const categoryData = []
  data && data.map((item , index) => {
    categoryData.push({
      no:item.no = (
        <div>{index+1}</div>
      ),
      category_name: item.category_name,
      status: item.status,
      header: item.header,
      action: item.action = (
       <>
        <button
              className="btn btn-primary btn-sm ml-2"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editCategory/${item.id}`)}
             >
              <i className="far fa-edit"></i>
           </button>{" "}
           <button
              className="btn btn-danger btn-sm ml-2"
              data-toggle="tooltip"
              title="Delete"
              onClick={() => handleDelete(item.id)}
             >
              <i className="fas fa-trash"></i>
           </button>{" "}
            <button
              className="btn btn-info btn-sm ml-3"
              data-toggle="tooltip"
              title="View"
              onClick={() => history.push(`viewCategory/${item.id}`)}
              >
                <i className="fas fa-eye"></i>
            </button>
       </>
      )
    })
  })

  const handleDelete = (id) => {
    console.log('ID~~~>>', id)
    dispatch(deleteCategoryStart(id))
    console.log('ID~~~>>', id)
    console.log('ID~~~>>', item)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  }).then((willDelete) => {
      if (willDelete) {
          dispatch(deleteCategoryStart(item?.id))
          swal(" Category deleted successfully!", {
              icon: "success",
          });
         
      } else {
          swal("Your data is safe!");
      }
  });
  }

  const datas = {
    columns: [
      {
        label: 'No',
        field: 'no',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Category Name',
        field: 'category_name',
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
        label: 'Header Status',
        field: 'header',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Action',
        field: 'action'
      }
    ],
    rows: categoryData
  };


  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Categories</h1>
          </div>
          <div className="row">
            <div className="col-lg-15 col-md-12 col-12 col-sm-15">
              <div className="card">
                <div className="card-header">
                  <h4>Categories Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addCategory'} className="btn btn-primary"> + New </Link>
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
    </>
  )
}

export default Categories;