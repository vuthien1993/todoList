import React from "react";
import "./NavBar.css";
function NavBar() {
  return (
    <nav className="navbarborder">
      <div className="container-fluid navbarContent">
        <div className="row">
          <p className="col-md-3">
            <span className="fa-solid fa-grip" /> <span> To Do </span>
          </p>
          <div className="col-md-6">
            <button>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>

            <input />
          </div>

          <div className="col-md-3">
            <span className="fa-solid fa-gear" />
            <span className="fa-solid fa-question" />
            <span className="fas fa-bullhorn" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
