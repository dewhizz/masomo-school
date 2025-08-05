import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchTeachers = async () => {
    try {
      toast.info("Loading Teachers....");
      const res = await axios.get(
        "https://school-api-fexk.onrender.com/api/teacher/",
        authHeader
      );
      setTeachers(res.data);
      console.log(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load teachers");
    }
  };

  // Fetch teachers on component mount
  useEffect(() => {
    FetchTeachers();
  }, []);

  //   delete function
  const handleDelete = async (id) => {
    if (window.confirm("Delete this teacher"))
      try {
        toast.warning("Deleting Credentials");
        const res = await axios.delete(
          `https://school-api-fexk.onrender.com/api/teacher/${id}`,
          authHeader
        );
        toast.info(res.data.message);
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
  };

  // handle edit
  const handleEdit = (teacherData) => {
    navigate("/admin-dashboard/teachers/edit", { state: { teacherData } });
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
            /teachers
          </li>
        </ol>
      </nav>

      {/* card */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Teachers List
          </h5>
          <button
            className="btn btn-success"
            onClick={() => navigate("/admin-dashboard/teachers/add")}
          >
            <i className="bi bi-plus-circle"></i> Add Teacher
          </button>
        </div>

        {/* list of the teachers */}
        <div className="table-responsive">
          {teachers.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-circle me-2"></i>No Teachers Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((tch, index) => (
                  <tr key={tch._id}>
                    <td>{index + 1}</td>
                    <td>{tch.name}</td>
                    <td>{tch.email}</td>
                    <td>{tch.phone}</td>
                    <td>{tch.subject}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(tch)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(tch._id)}
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

export default Teachers;
