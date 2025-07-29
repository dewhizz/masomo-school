import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

const HomeComponent = () => {
    return (
      <div className="homepage">
        {/* navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container">
            {" "}
            <Link className="navbar-brand" to={"/"}>
              Masomo School
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#"
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
                    {" "}
                    About{" "}
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#cbc">
                    {" "}
                    CBC Curriculum{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#why-masomo">
                    {" "}
                    Why Us
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link className="nav-link" to={"/login"}>
                    Login{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* here section */}
        <section className="hero position-relative text-white">
          <img
            src="/images/banner.avif"
            alt="banner"
            className="w-100  img-fluid"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <div className="hero-text position-absoluet top-50 start-50 translate-middle text-center bg-dark-opacity-50 p-4 rounded">
            <h1 className="display-1 fw-bold">welcome to Masomo School</h1>
            <p className="lead">
              we are the school that provides quality education to our students{" "}
            </p>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-success">About Masomo School</h2>
            <p>
              Masomo school is a leading institution dedicated to providing
              qualityeducation rooted in the CBC as set by the Kenyan Ministry
              of Education
            </p>
            <p>
              We focus on holistic development , creativity and real world
              skills for tomorrow's leaders
            </p>
          </div>
        </section>
        {/* CBC section */}
        <section id="cbc" className="py-5">
          <div className="container">
            <h2 className="text-success">Understanding CBC in Kenya</h2>
            <p>
              The CBC was introduced in kenya to replace the 8-4-4. It focused
              on nuturing learners talents and abilities through practical
              skills-oriented learning experience. CBC emphasises
              learners-centered teaching aims at developing competencies that
              align with national development goals{" "}
            </p>
            <ul className="list group list-group-flust mt-3">
              <li className="list-group-item">Focus on skills & talents</li>
              <li className="list-group-item">Learner-Centered approach</li>
              <li className="list-group-item">Real-life Problem solving</li>
              <li className="list-group-item">Continious assessment</li>
            </ul>
          </div>
        </section>

        {/* why us section */}
        <section id="why-masomo" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-success text-center mb-4">
              Why Choose Masomo School
            </h2>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">Experienced Teachers</h3>
                    <p className="card-text">
                      Our educators are trained in CBC and Commited to student
                      growth
                    </p>
                  </div>
                </div>
              </div>


              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">Modern Facilits</h3>
                    <p className="card-text">We provide state of the art, tech and leadership beyond books </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">Co-curicular activites</h3>
                    <p className="card-text">Students explore sports,arts,tech and leadership beyond books </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact section */}
        <section id="contact" className="py-5 text-center">
            <div className="container">
                <h2 className="text-success">Join Masomo School today</h2>
                <p>Enroll your child in a school that builds future-ready citizens</p>
                <a href="" className="btn btn-success">Apply Now</a>
            </div>
        </section>

        {/* footer */}
        <footer className="bg-dark text-light text-center py-3">
            <p className="mb-0">&copy;{new Date().getFullYear()}Masomo School. All Rights Reserved</p>
        </footer>
      </div>
    );
};

export default HomeComponent;
