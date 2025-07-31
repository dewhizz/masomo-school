import axios from 'axios';
import React, { Link,useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    // setting our hooks useState
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState("");


    const [error,setError]=useState('')
    const [loading,setLoading]=useState('')
    const navigate=useNavigate

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')
        setLoading('Logging in .......')
        try {
          const data={email,password}
          const res = await axios.post(
            "https://school-api-fexk.onrender.com/api/user/Auth/",
            data);
            setLoading('')
              console.log(res.data);
              if(res.data.user){
                if(res.data.user.role==='admin'){
                  navigate('/admin-dashboard')
                }else if(res.data.user.role==='teacher'){
                  navigate('/teacher-dashboard')
                }else if(res.data.user.role==='parent'){
                  navigate('/parent-dashboard')
                }else{
                  navigate('/')
                }
              }
              setError(res.data.message)
        } catch (error) {
          setLoading('')
          setError(error.message)
        }
    }
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form
        onSubmit={handleSubmit}
        className=" card shadow p-4 bg-light rounded"
      >
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center text-success">Login</h2>

        {/* alerts */}
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="alert alert-info">{loading}</div> : null}

        <input
          type="email"
          className="form-control mb-3 mt-3"
          placeholder="Email"
          required
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3 mt-3"
          placeholder="Password"
          required
          value={password}
          onChange={(e) =>setPassword (e.target.value)}
        />

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
        <div className="text-center">
          <p>
            Don't have an Account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
