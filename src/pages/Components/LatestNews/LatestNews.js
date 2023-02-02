import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteLatestNewsStart, loadLatestNewsStart } from "../../../Redux/Actions/LatestNewsActions";
import swal from "sweetalert";


const LatestNews = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const latestNewsData = useSelector((state) => state?.latestnewsData?.latestnews?.rows)

  useEffect(() => {
    dispatch(loadLatestNewsStart())
  }, [])

  const [data, setData] = useState(latestNewsData)
  useEffect(() => {
    setData(latestNewsData)
  }, [latestNewsData])

  const latestnewsData = []
  data && data.map((item , index) => {
    latestnewsData.push({
      no:item.no = (
        <div>{index+1}</div>
      ),
      category_ref_id:item.category_ref_id,
      Subcategory_ref_id:item.Subcategory_ref_id,
      title: item.title,
      Description: item.Description,
      image:<img src={item.image} style={{ height: "60px" }}></img>,
      audio:<audio controls><source src={item.audio} type='audio/mp3' style={{ height: "30px" }} /></audio>,
      video:<video width="100" height="50" controls><source src={item.video} type="video/mp4"/></video>,
      status: item.status,
      action: item.action = (
       <>
        <button
              className="btn btn-primary btn-sm ml-2"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editLatestNews/${item.id}`)}
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
              className="btn btn-info btn-sm ml-2"
              data-toggle="tooltip"
              title="View"
              onClick={() => history.push(`/viewLatestNews/${item.id}`)}
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
        label: 'Category Ref id',
        field: 'category_ref_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Subcategory Ref id',
        field: 'Subcategory_ref_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Description',
        field: 'Description',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'image',
        width: 150
      },
      {
        label: 'Audio',
        field: 'audio',
        width: 150
      },
      {
        label: 'Video',
        field: 'video',
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
    rows: latestnewsData
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
          dispatch(deleteLatestNewsStart(id))
          swal("Latest News deleted successfully!", {
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
            <h1>Latest News</h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-25">
              <div className="card">
                <div className="card-header">
                  <h4>Latest News Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addLatestNews'} className="btn btn-primary">+ New </Link>
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

export default LatestNews;