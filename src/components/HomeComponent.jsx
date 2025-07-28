import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

const HomeComponent = () => {
return (
<div className="homepage">
    {/* navbar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container">
        <Link className="navbar-brand" to={"/"}> Masomo School  </Link>
        <button className="navbar-toggler"type="button"data-bs-toggle="collapse"data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>

        <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
        >
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" href="#about">
                About
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#cbc">
                CBC Curriculum
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#why-masomo">
                Why Us
            </a>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={"/login"}>
                Login
            </Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
    {/* here section */}
    <section className="hero position-relative text-white">
        <img src="" alt="banner" className="w-100 img-fluid" style={{maxHeight:'500px',objectFit:'cover'}}/>
        <div className='hero-text position-absoluet top-50 translate-middle text-center bg-dark-opacity-50 p-4 rounded'>
            <h1 className="display-1 fw-bold">welcome to Masomo School</h1>
            <p className="lead">we are the school that provides quality education to our students</p>
        </div>
    </section>
</div>
);
};

export default HomeComponent;
