import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchClasses = async () => {
    try {
      toast.info("Loading Classes....");
      const res = await axios.get(
        "https://school-api-fexk.onrender.com/api/classroom/",
        authHeader
      );
      setClasses(res.data);
      console.log(res.data)
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load classes");
    }
  };

  // Fetch classes on component mount
  useEffect(() => {
    FetchClasses();
  }, []);

//   delete function
const handleDelete=async (id)=>{
    if(window.confirm('Delete this class'))
        try {
            toast .warning('Deleting Credentials')
            await axios.delete(
              `https://school-api-fexk.onrender.com/api/classroom/${id}`,authHeader)
              toast.info(res.data.message)
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message)

        }
}

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
            /classes
          </li>
        </ol>
      </nav>

      {/* card */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Classes List
          </h5>
          <button className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Add Class
          </button>
        </div>

        {/* list of the classes */}
        <div className="table-responsive">
          {classes.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-circle me-2"></i>No Classes Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Grade Level</th>
                  <th>Class Year</th>
                  <th>Teacher</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, index) => (
                  <tr key={cls._id}>
                    <td>{index + 1}</td>
                    <td>{cls.name}</td>
                    <td>{cls.gradeLevel}</td>
                    <td>{cls.classYear}</td>
                    <td>{cls.teacher?.name || "N/A"}</td>
                    <td>{cls.teacher?.phone || "N/A"}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button className="btn btn-sm btn-danger me-2"
                      onClick={()=>handleDelete(cls._id)}
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

export default Classes;
