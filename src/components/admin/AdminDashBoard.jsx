import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminDashBoard = () => {
  const [stats, setStats] = useState({
    totalClassrooms: 0,
    totalParents: 0,
    totalTeachers: 0,
    totalStudents: 0,
    activeUsers: 0,
    recentTeachers: [],
    recentStudents: [],
  });

  const {token}=useContext(AuthContext)
  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(()=>{
    const fetchStats=async()=>{
      try {
        const res = await axios.get(
          "https://school-api-fexk.onrender.com/api/admin/",authHeader
        );
        setStats(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchStats()
  },[authHeader])

  return (
    <div className="container my-2">
      <h2 className="text-center text-success mb-2">
        Admin Dashboard Overview
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Teachers */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Teachers</h6>
          <h2 className="fw-bold text-dark">{stats.totalTeachers}</h2>
        </div>

        {/* students */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Students</h6>
          <h2 className="fw-bold text-dark">{stats.totalStudents}</h2>
        </div>

        {/* parents */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Parents</h6>
          <h2 className="fw-bold text-dark">{stats.totalParents}</h2>
        </div>

        {/* classrooms */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Classrooms</h6>
          <h2 className="fw-bold text-dark">{stats.totalClassrooms}</h2>
        </div>

        <div className="mt-5">
          <div className="card-header ng-primary text-light">
            <h5>
              <i className="bi bi-person-lines-fill">Recent Teachers</i>
            </h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length===0?(
            <p className="text-muted">No Recent Teachers</p>
            ):(
              <ul className="list-group">
                {stats.recentTeachers.map((teacher,index)=>(
                  <li key={index} className='list-group-item'>{teacher.name}-{teacher.email}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

                <div className="mt-5">
          <div className="card-header ng-primary text-light">
            <h5>
              <i className="bi bi-person-lines-fill">Recent Teachers</i>
            </h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length===0?(
            <p className="text-muted">No Recent Teachers</p>
            ):(
              <ul className="list-group">
                {stats.recentTeachers.map((teacher,index)=>(
                  <li key={index} className='list-group-item'>{teacher.name}-{teacher.email}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard