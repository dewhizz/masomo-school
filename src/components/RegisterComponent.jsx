import React, {  useState } from "react";
import { Link } from "react-router-dom";


const RegisterComponent = () => {
  // setting our hooks useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form action="" className="card shadow p-4 bg-light rounded">
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center mb-4 text-success">Register</h2>

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
            <Link to="/" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
