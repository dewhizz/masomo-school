import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchParents = async () => {
    try {
      toast.info("Loading Parents....");
      const res = await axios.get(
        "https://school-api-fexk.onrender.com/api/parent/",
        authHeader
      );
      setParents(res.data);
      console.log(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load parents");
    }
  };

  // Fetch parents on component mount
  useEffect(() => {
    FetchParents();
  }, []);

  //   delete function
  const handleDelete = async (id) => {
    if (window.confirm("Delete this parent"))
      try {
        toast.warning("Deleting Credentials");
        const res = await axios.delete(
          `https://school-api-fexk.onrender.com/api/parent/${id}`,
          authHeader
        );
        toast.info(res.data.message);
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
  };

  // handle edit
  const handleEdit = (parentData) => {
    navigate("/admin-dashboard/parents/edit", { state: { parentData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* breadcrumbs provide ease in path location */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item-active" aria-label="page">
            /parents
          </li>
        </ol>
      </nav>

      {/* card */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Parents List
          </h5>
          <button
            className="btn btn-success"
            onClick={() => navigate("/admin-dashboard/parents/add")}
          >
            <i className="bi bi-plus-circle"></i> Add Parent
          </button>
        </div>

        {/* list of the parents */}
        <div className="table-responsive">
          {parents.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-circle me-2"></i>No Parents Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>National ID</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent, index) => (
                  <tr key={parent._id}>
                    <td>{index + 1}</td>
                    <td>{parent.name}</td>
                    <td>{parent.email}</td>
                    <td>{parent.phone}</td>
                    <td>{parent.nationalId}</td>
                    <td>{parent.address}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(parent)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(parent._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parents;
