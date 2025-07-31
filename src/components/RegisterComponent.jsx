import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const RegisterComponent = () => {
  // setting our hooks useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // user interaction
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
  const [loading, setLoading]=useState('')
  const navigate=useNavigate()

  // function to handle the submission
  const handleSubmit=async(e)=>{
      e.preventDefault() //prevents the page from reloading
         setError("");
      setLoading('Registering Admin Account...') //this updates the use state from null to the setLoading
   
      try {
        // this is what we intend to send
        const data={name,email,password,secretKey}
        // axios helps us make http requests.Post requires the end point and the data
        const res = await axios.post(
          "https://school-api-fexk.onrender.com/api/user/Auth/register"
        ,data); 
        console.log('registration',res.data)
        if(res.data.newUser){
            setLoading("");
            setSuccess(res.data.message);
            alert("Registration Successful! You Will be redirected to login");
            navigate("/login");

        }

        if(res.status==403){
          setError('Unauthorized access')
        }
        setLoading("");
        setError(res.data.message)
      } catch (error) {
        setError(error.message)
        setLoading('')
      }
  }
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form onSubmit={handleSubmit} className="card shadow p-4 bg-light rounded">
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center mb-4 text-success">Register</h2>
        {/* alerts */}
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {success ? <div className="alert alert-success">{success}</div> : null}
        {loading ? <div className="alert alert-info">{loading}</div> : null}
       
        {/* inputs */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {name}
        <input
          type="email"
          className="form-contol mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {email}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="SecretKey"
          onChange={(e) => setSecretKey(e.target.value)}
          required
        />
        {secretKey}
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">
            {" "}
            Register
          </button>
        </div>
        <div className="text-center">
          <p>
            Already have an account?
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
