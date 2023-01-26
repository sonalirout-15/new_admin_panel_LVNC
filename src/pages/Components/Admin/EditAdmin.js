import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateAdminStart } from "../../../Redux/Actions/AdminActions";

const initialState = {
  name: '',
  mobile: '',
  gender: '',
  address: '',
  image: '',
}

const EditAdmin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [submit , setSubmit] = useState();
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  var { name, mobile, gender, address, image } = formValue;
  const dispatch = useDispatch();
  var { id } = useParams();

  const admin = useSelector((state) => state?.admin?.admin?.rows);
  const adminSuccess = useSelector((state) => state?.admin?.updateAdmin);

 
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleAdmin = admin ? admin.find((item) => item.id === Number(id)) : null;
      setFormValue({ ...singleAdmin });
    } else {
      setEditMode(false);
      setFormValue({ ...formValue });
    }
  }, [id]);


  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const handleFileSelect = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name !== '' && mobile !== '' && gender !== '' &&  address !== '' && image !== ''){
      if(editMode){
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("image", image);
        dispatch(updateAdminStart(formData));
        setEditMode(false);
        setSubmit(true);
      }
     
    }
  };

  if(adminSuccess?.message === "Admin updated succesfully..."){
    history.push('/admins')
  }


  return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
          <h1>Admins</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <center><strong>Update Admin</strong></center>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Admin Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name || ""}
                          name="name"
                          onChange={onInputChange}
                        />
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex",
                          fontFamily : 'bold',
                          fontSize: '15px'
                        }}>
                          {submit && !name && <p>Name required.</p>}
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Phone Number (US Format)</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control phone-number"
                            id="mobile"
                            value={mobile || ""}
                            name="mobile"
                            onChange={onInputChange}
                          />
                        </div>
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex",
                          fontFamily : 'bold',
                          fontSize: '15px'
                        }}>
                           {submit && !mobile && <p>Mobile required.</p>}
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <div onChange={onInputChange}>
                          <input type="radio" value="Male" name="gender"  /> Male {" "}
                          <input type="radio" value="Female" name="gender" /> Female {" "}
                          <input type="radio" value="Other" name="gender"  /> Other {" "}
                        </div>
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex",
                          fontFamily : 'bold',
                          fontSize: '15px'
                        }}>
                           {submit && !gender && <p>Gender required.</p>}
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={address || ""}
                          name="address"
                          onChange={onInputChange} />
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex",
                          fontFamily : 'bold',
                          fontSize: '15px'
                        }}>
                          {submit && !address && <p>Address required.</p>}
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="/accept/*"
                          id="image"
                          defaultValue={image || ""}
                          name="image"
                          onChange={handleFileSelect} />
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex",
                          fontFamily : 'bold',
                          fontSize: '15px'
                        }}>
                           {submit && !image && <p>Image required.</p>}
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary">Update</button>{" "}
                      <Link to={'/admins'} className="btn btn-info"> Back </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
  )
}

export default EditAdmin;