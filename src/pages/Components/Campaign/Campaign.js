import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteCampaningStart, loadCampaningStart } from "../../../Redux/Actions/CampaignActions";
import swal from "sweetalert";


const Campaign = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const campaningData = useSelector((state) => state?.campaning?.campaning?.CampaningData?.rows)

  useEffect(() => {
    dispatch(loadCampaningStart())
  }, [campaningData])
  
  const [data, setData] = useState(campaningData)
  useEffect(() => {
    setData(campaningData)
  }, [campaningData])

  const campaningsData = []
  data && data.map((item , index) => {
    campaningsData.push({
      no:item.no = (
        <div>{index+1}</div>
      ),
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
              onClick={() => history.push(`/editCampaign/${item.id}`)}
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
              onClick={() => history.push(`/viewCampaign/${item.id}`)}
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
        field: 'title',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Description',
        field: 'description',
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
    rows: campaningsData
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
          dispatch(deleteCampaningStart(id))
          swal("Campign deleted successfully!", {
              icon: "success",
          });
      } else {
          swal("Your data is safe!");
      }
  });
  }
  // const pagination = paginationFactory({
  //   page: 1,
  //   sizePerPage: 4,
  //   lastPageText: '>>',
  //   firstPageText: '>',
  //   prePageText: '<',
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  //   onPageChange: function (page, sizePerPage) {
  //     console.log('page', page);
  //     console.log('sizePerPage', sizePerPage)
  //     console.log()
  //   },
  //   onSizePerPageChange: function (page, sizePerPage) {
  //     console.log('page', page);
  //     console.log('sizePerPage', sizePerPage)
  //   }
  // })

  return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Campaigns</h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-25">
              <div className="card">
                <div className="card-header">
                  <h4>Campaign Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addCampaign'} className="btn btn-primary">+ New </Link>
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

export default Campaign;