import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';
import { Link, useHistory } from "react-router-dom";
import { deleteSubcategoryStart, loadSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";
import swal from "sweetalert";

const Subcategories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const subcategoriesData = useSelector((state) => state?.subcategory?.subcategories?.categoryData?.rows);

  useEffect(() => {
    dispatch(loadSubcategoryStart())
  }, [])
  
  const [data, setData] = useState(subcategoriesData)
  
  useEffect(() => {
    setData(subcategoriesData)
  }, [subcategoriesData])

  const subcategoryData = []
  data && data.map((item , index) => {
    subcategoryData.push({
      no:item.no = (
        <div>{index+1}</div>
      ),
      subcategory_name: item.subcategory_name,
      category_ref_id: item.category_ref_id,
      status: item.status,
      action: item.action = (
       <>
        <button
              className="btn btn-primary btn-sm ml-2"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editSubcategory/${item.id}`)}
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
              onClick={() => history.push(`viewSubcategory/${item.id}`)}
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
        label: 'Category Ref Id',
        field: 'category_ref_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Subcategory Name',
        field: 'subcategory_name',
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
    rows: subcategoryData
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
          dispatch(deleteSubcategoryStart(id))
          swal("Subcategory deleted successfully!", {
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
            <h1>Subcategories</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Subcategories Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addSubcategory'} className="btn btn-primary"> + New </Link>
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

export default Subcategories;