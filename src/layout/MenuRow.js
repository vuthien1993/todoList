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
  const [displayAtm, setDisplayAtm] = useState(false);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [displayTask, setDisplayTask] = useState(false);
  const [showTasksDetail, setShowTasksDetail] = useState(false);
  const [tasks, setTasks] = useState("");
  const [show, setShow] = useState(false);
  const mydayClickHandler = () => {
    setDisplayMyday(true);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const impotantClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(true);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const plannedClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(true);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const atmClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(true);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const flagClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(true);
    setDisplayTask(false);
  };
  const taskClickHandler = () => {
    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(true);
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
      <div className="borderNavRow">
        <div className="fll leftColumn">
          <div>
            <div className="siderbar">
              <i className="fa-solid fa-bars" onClick={displayHandler}></i>
            </div>
            {display && (
              <div className="siderbarContent">
                <div
                  onClick={mydayClickHandler}
                  className={` ${
                    displayMyday ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i className="fa-regular fa-sun"></i> <span>My Day</span>
                </div>

                <div
                  onClick={impotantClickHandler}
                  className={` ${
                    displayImportant ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i className="fa-regular fa-star"></i> <span>Important</span>
                </div>
                <div
                  onClick={plannedClickHandler}
                  className={` ${
                    displayPlanned ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>Planned</span>
                </div>
                <div
                  onClick={atmClickHandler}
                  className={` ${
                    displayAtm ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i className="fa-regular fa-user"></i>
                  <span>Assigned to me</span>
                </div>
                <div
                  onClick={flagClickHandler}
                  className={` ${
                    displayFlag ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i class="fa-regular fa-flag"></i> <span>Flagged email</span>
                </div>
                <div
                  onClick={taskClickHandler}
                  className={` ${
                    displayTask ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <i className="fa-solid fa-house"></i>
                  <span>Tasks</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="fll main-content">
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
    </React.Fragment>
  );
}

export default MenuRow;
