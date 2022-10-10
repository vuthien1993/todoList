import React, { useState } from "react";
import Important from "../component/Important/Important";
import Planned from "../component/Planned/Planned";
import MyDay from "../component/MyDay/MyDay";

import "./MenuRow.css";
function MenuRow() {
  const [display, setDisplay] = useState(true);
  const [displayMyday, setDisplayMyday] = useState(true);
  const [displayImportant, setDisplayImportant] = useState(false);
  const [displayPlanned, setDisplayPlanned] = useState(false);
  const mydayClickHandler = () => {
    setDisplayMyday(true);
    setDisplayImportant(false);
    setDisplayPlanned(false);
  };
  const impotantClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(true);
    setDisplayPlanned(false);
  };
  const plannedClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(true);
  };
  const displayHandler = () => {
    setDisplay((pre) => !pre);
  };
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="menuRowTotal">
              <div className="menuRow">
                <div>
                  <button onClick={displayHandler}>
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>
                {display && (
                  <div>
                    <p onClick={mydayClickHandler}>
                      <i className="fa-regular fa-sun"></i> My Day
                    </p>

                    <p onClick={impotantClickHandler}>
                      <i className="fa-regular fa-star"></i>Important
                    </p>
                    <p onClick={plannedClickHandler}>
                      <i className="fa-solid fa-calendar-days"></i>Planned
                    </p>
                    <p>
                      <i className="fa-regular fa-user"></i>Assigned to me
                    </p>
                    <p>
                      <i className="fa-solid fa-house"></i>Tasks
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9 main-content">
            {displayMyday && <MyDay />}
            {displayImportant && <Important />}
            {displayPlanned && <Planned />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuRow;
