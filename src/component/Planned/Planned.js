import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import "./Planned.css";

function Planned() {
  const idDetail = useSelector((state) => state.important.idTasks);
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const showPlanned = useSelector((state) => state.important.showPlanned);
  const plannedTasksArr = tasksArr.filter(
    (ele) => ele.isPlanned === true && ele.isDone !== true
  );

  const dispatch = useDispatch();
  //khai bao su dung custom hook

  const [id, setId] = useState("");
  const {
    value: enteredPlanned,
    isValid: enteredPlannedIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetPlannedInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredPlannedIsvalid) {
    formIsvalid = true;
  }

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      isDone: false,
      isImportant: false,
      isMyday: false,
      isPlanned: true,
      isTasks: false,
      id: id,
      tasks: enteredPlanned,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetPlannedInput();
  };
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const idI = ele.id;
    dispatch(importantAction.important({ idI }));
    if (ele.id === id) {
      const isImportant = !ele.isImportant;
      dispatch(importantAction.showImportantDetail({ isImportant }));
    }
  };
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    const isDone = ele.isDone;
    const isMyday = ele.isMyday;
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    dispatch(importantAction.showDetail({ tasksName, idDetail, isMyday }));
    dispatch(importantAction.showImportantDetail({ isImportant, isDone }));
    console.log(showTasksDetail);
  };
  //ham chon va bo chon hoan thanh cong viec
  const isDoneHandler = (ele, event) => {
    event.stopPropagation();
    const idC = ele.id;
    dispatch(importantAction.complete({ idC }));
    if (idC === idDetail) {
      dispatch(importantAction.showCompletedDetail());
    }
  };
  const showPlannedHandler = () => {
    dispatch(importantAction.showPlanned());
  };

  ////////////////////// xử lý step/////////////
  const nextStepArr = useSelector((state) => state.nextStep.nextStepArr);
  const displayStep = (ele) => {
    const stepDetail = nextStepArr.filter(
      (element) => element.idDetail === ele.id
    );
    const stepDetailCompleted = stepDetail.filter((e) => e.isDone === true);
    return { stepDetail, stepDetailCompleted };
  };
  return (
    <React.Fragment>
      <div>
        <div className="mydayBorder">
          <div className={`fll marginTMyday lineTasks`} id="sizeText">
            <p className="textColorImportant">
              <i className="fa-solid fa-calendar-days ipadding" />
              <span>Planned</span>
              <span
                className="fa-solid fa-ellipsis dotpadding"
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              />{" "}
            </p>
          </div>
        </div>
        {/* /////////////////////////////// */}
        <div className="formSubmitMyday">
          <form onSubmit={submitHandler}>
            <div className="totalInputTask">
              <div className="inputTasks">
                <i className="fa-regular fa-circle"></i>
                <input
                  placeholder="Add a tasks"
                  value={enteredPlanned}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
              </div>
              <div className="iconMydayAdd">
                <div className="textGray fll iconWidth">
                  <i
                    className="fa-solid fa-calendar-days"
                    data-toggle="tooltip"
                    title="Add due date!"
                  ></i>
                  <i
                    className="fa-regular fa-bell"
                    data-toggle="tooltip"
                    title="Remind me!"
                  ></i>
                  <i
                    className="fa-solid fa-repeat"
                    data-toggle="tooltip"
                    title="Repeat!"
                  ></i>
                </div>
                <div className="fll" id="ffl">
                  <button disabled={!formIsvalid}>Add</button>
                </div>
              </div>
            </div>
            <div className="tasksArrList">
              {plannedTasksArr.length > 0 && (
                <div className="today" onClick={showPlannedHandler}>
                  {!showPlanned ? (
                    <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                  ) : (
                    <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                  )}
                  <span>Today</span> <span>{plannedTasksArr.length}</span>
                </div>
              )}
              {showPlanned && (
                <div>
                  {[...plannedTasksArr].reverse().map((ele) => {
                    return (
                      <div
                        className="borderTasksArr"
                        key={ele.id}
                        onClick={() => showTasksDetailHandler(ele)}
                      >
                        <div className="fll iconLine">
                          <i
                            className="fa-regular fa-circle "
                            onClick={(event) => {
                              isDoneHandler(ele, event);
                            }}
                          ></i>
                        </div>
                        <div className="fll taskName">
                          <span> {ele.tasks}</span>
                          <br />
                          <span className="textSize">
                            <span>Tasks</span>
                            {displayStep(ele).stepDetail.length !== 0 && (
                              <span>
                                .{" "}
                                {displayStep(ele).stepDetail.length ===
                                  displayStep(ele).stepDetailCompleted
                                    .length && (
                                  <span className="fa-regular fa-circle-check" />
                                )}{" "}
                                {displayStep(ele).stepDetailCompleted.length} of{" "}
                                {displayStep(ele).stepDetail.length}
                              </span>
                            )}
                            <span className="textBlue">
                              <span>.</span>
                              <span className="fa-solid fa-calendar-days" />
                              <span>Today</span>
                            </span>
                          </span>
                        </div>
                        <div className={`fll iconLineStar`}>
                          {!ele.isImportant && (
                            <i
                              style={{ color: "blue" }}
                              onClick={(event) => testHandler(ele, event)}
                              className="fa-regular fa-star"
                              data-toggle="tooltip"
                              title="Mark tasks as important!"
                            ></i>
                          )}
                          {ele.isImportant && (
                            <i
                              onClick={(event) => testHandler(ele, event)}
                              style={{ color: "blue" }}
                              className="fa-solid fa-star"
                              data-toggle="tooltip"
                              title="Remove importance!"
                            ></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Planned;
