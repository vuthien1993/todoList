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
  const [showTasksDetail, setShowTasksDetail] = useState(false);
  const [tasks, setTasks] = useState("");
  const [show, setShow] = useState(false);
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
  const showTasksDetailHandler = (data) => {
    setShowTasksDetail(true);
    setTasks(data);
  };
  const hiddenTasksDetail = () => {
    setShowTasksDetail(false);
  };
  const showModalHandler = () => {
    setShow(!show);
  };
  const classShowDetail = showTasksDetail ? "col-md-5" : "col-md-9";
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
          <div className={`${classShowDetail} main-content`}>
            {displayMyday && (
              <MyDay
                onShowTasksDetail={showTasksDetailHandler}
                showTasksDetail={showTasksDetail}
                show={show}
                onShowModal={showModalHandler}
                onHidden={hiddenTasksDetail}
              />
            )}
            {displayImportant && <Important />}
            {displayPlanned && <Planned />}
          </div>
          {showTasksDetail && (
            <div className="tasksDetail col-md-4">
              <div className="tasksDetailX row">
                <div className="col-md-10">
                  <i className="fa-regular fa-circle "></i>

                  {tasks}
                </div>
                <div className="col-md-2">
                  <i
                    className="fa-regular fa-star"
                    data-toggle="tooltip"
                    title="Mark tasks as important!"
                  ></i>
                </div>
              </div>
              <div className="tasksDetailInput">
                <div className="marginLDetail">
                  <i className="fa-regular fa-circle "></i>
                  <input placeholder="Add step" />
                </div>
                <div>
                  <div className="hoverdiv">
                    <div className="addtomyday">
                      <i className="fa-regular fa-sun"></i>
                      <span>Add to my day</span>
                    </div>
                    <div className="iconDetail">
                      <i className="fa-regular fa-bell"></i>

                      <span>Remind me</span>
                    </div>
                    <div className="iconDetail">
                      <i className="fa-solid fa-calendar-days" />
                      <span>Add due date</span>
                    </div>
                    <div className="iconDetail">
                      <i className="fa-solid fa-repeat"></i>
                      <span>Repeat</span>
                    </div>
                    <div className="iconDetail">
                      <i className="fa-regular fa-paper-plane"></i>{" "}
                      <span>Pick a category</span>
                    </div>
                    <div className="iconDetail">
                      <i className="fa-solid fa-paperclip" />
                      <span>Add file</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="deleteTasks">
                <i
                  className="fa-regular fa-square-caret-right"
                  onClick={hiddenTasksDetail}
                  data-toggle="tooltip"
                  title="Hide detail view!"
                />
                <span>Create on mon</span>
                <i
                  data-toggle="tooltip"
                  title="Delete tasks!"
                  data-placement="top"
                  className="fa-regular fa-trash-can"
                  onClick={showModalHandler}
                ></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuRow;
