import React, { useState } from "react";
import "./NavBar.css";
function NavBar() {
  const [showSeting, setShowSeting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showBullhorn, setShowBullhorn] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [showOff, setShowOff] = useState(true);
  const showOnOff = () => {
    setShowOk((pre) => !pre);
    setShowOff((pre) => !pre);
  };
  const showSetingHandler = () => {
    setShowSeting((pre) => !pre);
    setShowQuestion(false);
    setShowBullhorn(false);
  };
  const showQuestionHandler = () => {
    setShowQuestion((pre) => !pre);
    setShowSeting(false);
    setShowBullhorn(false);
  };
  const showBullhornHandler = () => {
    setShowBullhorn((pre) => !pre);
    setShowQuestion(false);
    setShowSeting(false);
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
            <span className="fa-solid fa-gear" onClick={showSetingHandler} />
            <span
              className="fa-solid fa-question"
              onClick={showQuestionHandler}
            />
            <span className="fas fa-bullhorn" onClick={showBullhornHandler} />
          </div>
        </div>
      </div>
      {showSeting && (
        <div className="showSeting">
          <div className="row setting">
            <h5>
              Setting
              <span onClick={showSetingHandler} className="spanSetting">
                X
              </span>
            </h5>
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
      {showQuestion && (
        <div className="borderQuestion ">
          <div className="setting">
            <h5>
              Help
              <span onClick={showQuestionHandler}>X</span>
            </h5>
            <div>
              <a href="#" target="_blank">
                Get support
              </a>
            </div>
            <div className="row marginSync">
              <div className="col-md-2">
                <button>Sync</button>
              </div>
              <div className="col-md-10">
                <p>Up to date</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showBullhorn && (
        <div className="borderBullhorn">
          <div className="setting">
            <h5>
              What's new
              <span onClick={showBullhornHandler}>X</span>
            </h5>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
