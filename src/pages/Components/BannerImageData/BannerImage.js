import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { deleteBannerImageStart, loadBannerImageStart } from "../../../Redux/Actions/BannerImageAction";

const BannerImage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const bannerData = useSelector((state) => state?.banner?.bannerImageData)

    useEffect(() => {
      dispatch(loadBannerImageStart())
    }, [])

    const [data, setData] = useState(bannerData)
    
    useEffect(() => {
      setData(bannerData)
    },[bannerData])
    
const handleDelete = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            dispatch(deleteBannerImageStart(id))
            swal("BannerImage deleted successfully!", {
                icon: "success",
            });
        } else {
            swal("Your data is safe!");
        }
    });
    }
    
    const bannersData = []
    data && data.map((item , index) => {
      bannersData.push({
        no:item.no = (
          <div>{index+1}</div>
        ),
        imageName: item.imageName,
        image:<img src={item.image} style={{ height: "60px" }}></img>,
        video: item.video,
        status: item.status,
        action: item.action = (
         <>
          <button
                className="btn btn-primary btn-sm ml-2"
                data-toggle="tooltip"
                title="Edit"
                onClick={() => history.push(`/editBanner/${item.id}`)}
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
                onClick={() => history.push(`/viewBanner/${item.id}`)}
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
          label: 'Title',
          field: 'imageName',
          sort: 'asc',
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
      rows: bannersData
    };
  


    return (
      <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Banners</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 col-sm-25">
            <div className="card">
              <div className="card-header">
                <h4>Banner Details</h4>
                <div className="card-header-action">
                  <Link to={'/addBanner'} className="btn btn-primary">+ New </Link>
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


export default BannerImage;