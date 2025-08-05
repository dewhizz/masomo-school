import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const TeacherAdd = () => {
  const { token } = useContext(AuthContext);

  // introduce the hooks
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [subject,setSubject] = useState([]);
  
  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

//   const FetchTeachers=async()=>{
//     try {
//         toast.info('Loading teachers ....')
//         const res = await axios.get(
//           "https://school-api-fexk.onrender.com/api/teacher/"
//         ,authHeader);
//         toast.dismiss()
//         console.log(res.data)
//         setTeachers(res.data)

//     } catch (error) {
//         toast.dismiss()
//         toast.error(error.response?.data?.message ||'Failed to load teachers')
//     }
//   }
//   useEffect(()=>{
//     FetchTeachers()
//   },[])

//   handle submit
const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        toast.info("Submitting ....")
        const data={name,email,phone,subject}
        const res=await axios.post('https://school-api-fexk.onrender.com/api/teacher/',data,authHeader)
        toast.success(res.data.message||"Teacher added Successfully")
        setName("")
        setEmail('')
        setPhone('')
        setSubject('')
    } catch (error) {
        toast.dismiss()
        toast.error(error.response?.data?.message || 'Error submitting')

    }
}
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
            /Teachers
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="page">/Add Teacher</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Add New Teacher
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/teachers"}>
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
                placeholder="Name of the Teacher"
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
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          
          </div>
          <button type='submit' className="btn btn-success">
            <i className='bi bi-save me-2'>Save Teacher</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherAdd