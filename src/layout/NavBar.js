import React, { useState } from "react";
import "./NavBar.css";
function NavBar() {
  const [show, setShow] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [showOff, setShowOff] = useState(true);
  const showOnOff = () => {
    setShowOk((pre) => !pre);
    setShowOff((pre) => !pre);
  };
  const showSeting = () => {
    setShow((pre) => !pre);
  };

  return (
    <nav>
      <div className="container-fluid navbarContent navbarborder">
        <div className="row">
          <p className="col-md-3">
            <span className="fa-solid fa-grip" /> <span> To Do </span>
          </p>
          <div className="col-md-7">
            <button>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
            <input />
          </div>

          <div className="col-md-2">
            <span className="fa-solid fa-gear" onClick={showSeting} />
            <span className="fa-solid fa-question" />
            <span className="fas fa-bullhorn" />
          </div>
        </div>
      </div>
      {show && (
        <div className="showSeting">
          <div className="row setting">
            <h5 className="col-md-10">Setting</h5>
            <p className="col-md-1" onClick={showSeting}>
              x
            </p>
          </div>
          <h5 className="marginLeftSetting">General</h5>
          <div className="marginLeftSetting">
            <p>Confirm before deleting</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="marginLeftSetting">
            <p>Add new tasks on top</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round" onClick={showOnOff}></span>{" "}
            </label>
            {showOff && <span>Off</span>}
            {showOk && <span>On</span>}
          </div>
          <div className="marginLeftSetting">
            <p>Move starred tasks to top</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="marginLeftSetting">
            <p>Play completion sound</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="marginLeftSetting">
            <p>Show right-click menus</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="marginLeftSetting">
            <p>Turn on reminder notifications</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="marginLeftSetting">
            <p>Show tasks that seem important in My Day</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
