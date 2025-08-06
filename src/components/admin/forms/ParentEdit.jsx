import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const ParentEdit = () => {
  const { token } = useContext(AuthContext);

  // introduce the hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // recieve sata from the classes component
  const { state } = useLocation();
  const selectedParent = state?.parentData;

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // useEffect to update the hooks /state to this component
  useEffect(() => {
    if (!selectedParent) {
      toast.error("No Parent data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/parents");
      }, 2000);
      return;
    }
    setName(selectedParent?.name || "");
    setEmail(selectedParent?.email || "");
    setPhone(selectedParent?.phone || "");
    setNationalId(selectedParent?.nationalId || "");
    setAddress(selectedParent?.address || "");
  }, [selectedParent, navigate]);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Updating ....");
      const data = { name, email, phone,nationalId,address};
      const res = await axios.put(
        `https://school-api-fexk.onrender.com/api/parent/${selectedParent._id}`,
        data,
        authHeader
      );
      console.log(res.data);
      toast.success(res.data.message || "Parent Updated Successfully");
      navigate("/admin-dashboard/parents");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error Updating");
    }
  };
  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* breadcrumbs provide ease in path location */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>{" "}
          <li
            className="breadcrumb-item-active"
            aria-label="/admin-dashboard/teachers"
          >
            /parents
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="page">/Edit Parent</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Update Parent
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/parents"}>
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        {/* form to post the class */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name of the Parent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="National ID"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2">Update Parent</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentEdit;
