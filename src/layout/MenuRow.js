import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hook/use-input";
import Important from "../component/Important/Important";
import Planned from "../component/Planned/Planned";
import MyDay from "../component/MyDay/MyDay";
import Tasks from "../component/Tasks/Tasks";
import { importantAction } from "../Redux/important";
import "./MenuRow.css";
import { nextStepAction } from "../Redux/nextStep";
function MenuRow() {
  const idDetail = useSelector((state) => state.important.idTasks);
  const isDone = useSelector((state) => state.important.isDone);
  const isImportant = useSelector((state) => state.important.isImportant);
  const tasksArrTotal = useSelector((state) => state.important.tasksArr);
  const tasksArr = tasksArrTotal.filter((ele) => ele.isDone !== true);
  const tasksImportant = tasksArrTotal.filter(
    (ele) => ele.isImportant === true && ele.isDone !== true
  );
  const mydayTasksArr = tasksArrTotal.filter(
    (ele) => ele.isMyday === true && ele.isDone !== true
  );
  const [display, setDisplay] = useState(true);
  const [displayMyday, setDisplayMyday] = useState(true);
  const [displayImportant, setDisplayImportant] = useState(false);
  const [displayPlanned, setDisplayPlanned] = useState(false);
  const [displayAtm, setDisplayAtm] = useState(false);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [displayTask, setDisplayTask] = useState(false);
  const [show, setShow] = useState(false);

  const mydayClickHandler = () => {
    dispatch(importantAction.hidenDetail());
    setDisplayMyday(true);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const impotantClickHandler = () => {
    dispatch(importantAction.hidenDetail());

    setDisplayMyday(false);
    setDisplayImportant(true);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const plannedClickHandler = () => {
    dispatch(importantAction.hidenDetail());

    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(true);
    setDisplayAtm(false);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const atmClickHandler = () => {
    dispatch(importantAction.hidenDetail());

    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(true);
    setDisplayFlag(false);
    setDisplayTask(false);
  };
  const flagClickHandler = () => {
    dispatch(importantAction.hidenDetail());

    setDisplayMyday(false);
    setDisplayImportant(false);
    setDisplayPlanned(false);
    setDisplayAtm(false);
    setDisplayFlag(true);
    setDisplayTask(false);
  };
  const taskClickHandler = () => {
    dispatch(importantAction.hidenDetail());

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

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.important.tasksName);
  console.log(tasks);
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const hiddenTasksDetail = () => {
    dispatch(importantAction.hidenDetail());
  };
  const showModalHandler = () => {
    setShow(!show);
  };
  const isDoneHandler = (event) => {
    event.stopPropagation();
    const idC = idDetail;
    dispatch(importantAction.complete({ idC }));
    dispatch(importantAction.showCompletedDetail());
  };
  //hàm tích chọn, bỏ chọn quan trọng khi mở detail
  const importantDetail = () => {
    dispatch(importantAction.importantDetail());
  };
  const deleteTaskHandler = () => {
    const id = idDetail;
    dispatch(importantAction.deleteTask({ id }));
    dispatch(importantAction.hidenDetail());
  };
  // xu ly them step detail task //////////////////////////////////////
  const nextStepArr = useSelector((state) => state.nextStep.nextStepArr);
  const stepDetail = nextStepArr.filter((ele) => ele.idDetail === idDetail);
  console.log(stepDetail);
  const {
    value: enteredStep,
    valueChangeHandler: changeHandler,
    reset: resetStepInput,
  } = useInput((value) => value.trim() !== "");

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let stepItem = {
      idDetail,
      isDone: false,
      id: id,
      nameStep: enteredStep,
    };
    dispatch(nextStepAction.addStep({ stepItem }));
    resetStepInput();
  };

  //ham xoa step

  const deleteStepHandler = (ele) => {
    const id = ele.id;
    dispatch(nextStepAction.deleteStep({ id }));
  };

  //ham chon step da hoan thanh
  const completedHandler = (ele) => {
    const idC = ele.id;
    dispatch(nextStepAction.completed({ idC }));
  };

  const classShowDetail = showTasksDetail ? "main-content1" : "main-content";
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
                  className={`${
                    displayMyday ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <div className="fll widthContent">
                    <i className="fa-regular fa-sun"></i> <span>My Day</span>
                  </div>
                  <div className="fll lineNumber">
                    {mydayTasksArr.length !== 0 && (
                      <span>{mydayTasksArr.length}</span>
                    )}
                  </div>
                </div>

                <div
                  onClick={impotantClickHandler}
                  className={` ${
                    displayImportant ? "siderbarItemActive" : "siderbarItem"
                  }`}
                >
                  <div className="fll widthContent">
                    <i className="fa-regular fa-star"></i>{" "}
                    <span>Important</span>
                  </div>
                  <div className="fll lineNumber">
                    {tasksImportant.length !== 0 && (
                      <span>{tasksImportant.length}</span>
                    )}
                  </div>
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
                  <div className="fll widthContent">
                    <i className="fa-solid fa-house"></i>
                    <span>Tasks</span>
                  </div>
                  <div className="fll lineNumber">
                    {tasksArr.length !== 0 && <span>{tasksArr.length}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`fll ${classShowDetail}`}>
          {displayMyday && <MyDay show={show} onShowModal={showModalHandler} />}
          {displayImportant && (
            <Important show={show} onShowModal={showModalHandler} />
          )}
          {displayPlanned && (
            <Planned show={show} onShowModal={showModalHandler} />
          )}
          {displayTask && <Tasks show={show} onShowModal={showModalHandler} />}
        </div>
        {showTasksDetail && (
          <div className="tasksDetail fll">
            <div className="tasksDetailX row">
              <div className="divR"></div>
              <div className="col-md-10">
                {isDone ? (
                  <i
                    style={{ color: "blue" }}
                    className="fa-solid fa-circle-check"
                    onClick={isDoneHandler}
                  />
                ) : (
                  <i
                    className="fa-regular fa-circle "
                    onClick={isDoneHandler}
                  />
                )}
                <span className={`${isDone && "checked"}`}> {tasks}</span>
              </div>
              <div className="col-md-2">
                {!isImportant && (
                  <i
                    onClick={importantDetail}
                    style={{ color: "blue" }}
                    className="fa-regular fa-star"
                    data-toggle="tooltip"
                    title="Mark tasks as important!"
                  ></i>
                )}
                {isImportant && (
                  <i
                    onClick={importantDetail}
                    style={{ color: "blue" }}
                    className="fa-solid fa-star"
                    data-toggle="tooltip"
                    title="Remove importance!"
                  ></i>
                )}
              </div>
            </div>
            {/* //////////////xu ly add step////////////////// */}
            <div className="tasksDetailInput textGray">
              {stepDetail.map((ele) => {
                return (
                  <div key={ele.id} className="addStep">
                    <div className="borderStep fll">
                      {ele.isDone ? (
                        <i
                          style={{ color: "blue" }}
                          className="fa-solid fa-circle-check"
                          onClick={() => completedHandler(ele)}
                        />
                      ) : (
                        <i
                          className="fa-regular fa-circle "
                          onClick={() => completedHandler(ele)}
                        />
                      )}
                    </div>
                    <div className="contentStep fll">
                      <div className="fll nameStep">
                        <span className={`${ele.isDone ? "checked" : ""}`}>
                          {ele.nameStep}
                        </span>
                      </div>
                      <div className="fll deleteStep">
                        <span onClick={() => deleteStepHandler(ele)}> ×</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <form className="marginLDetail" onSubmit={submitHandler}>
                <i className="fa-regular fa-circle "></i>
                <input
                  placeholder="Add step"
                  onChange={changeHandler}
                  value={enteredStep}
                />
                {enteredStep !== "" && <button>add</button>}
              </form>
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
                onClick={deleteTaskHandler}
              ></i>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default MenuRow;
