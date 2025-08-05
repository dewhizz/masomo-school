import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate,} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';


const ClassEdit = () => {
  const { token } = useContext(AuthContext);

  // introduce the hooks
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [classYear, setClassYear] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const navigate = useNavigate();

  // recieve sata from the classes component
  const { state } = useLocation();
  const selectedClass = state?.classData;

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchTeachers = async () => {
    try {
      toast.info("Loading teachers ....");
      const res = await axios.get(
        "https://school-api-fexk.onrender.com/api/teacher/",
        authHeader
      );
      toast.dismiss();
      console.log(res.data);
      setTeachers(res.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load teachers");
    }
  };
  useEffect(() => {
    FetchTeachers();
  }, []);

  // useEffect to update the hooks /state to this component
  useEffect(() => {
    if (!selectedClass) {
      toast.error("No class data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/classes");
      }, 2000);
      return;
    }
    setName(selectedClass?.name || "");
    setGradeLevel(selectedClass?.gradeLevel || "");
    setClassYear(setClassYear?.classYear);
    setSelectedTeacherId(selectedClass?.teacher?._id);
  }, [selectedClass, navigate]);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Updating ....");
      const data = { name, gradeLevel, classYear, teacher: selectedTeacherId };
      const res = await axios.put(
        `https://school-api-fexk.onrender.com/api/classroom/${selectedClass._id}`,
        data,
        authHeader
      );
      console.log(res.data)
      toast.success(res.data.message || "Class Updated Successfully");
      navigate('/admin-dashboard/classes')
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
            aria-label="/admin-dashboard/classes"
          >
            /classes
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="page">/Edit Class</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Update Class
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/classes"}>
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
                placeholder="Name of the Class"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Grade Level (ie.1,2..)"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Year of the class"
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher, index) => (
                  <option
                    key={teacher._id}
                    value={teacher._id}
                  >{`${teacher.name},${teacher.subject}`}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2">Update Class</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClassEdit