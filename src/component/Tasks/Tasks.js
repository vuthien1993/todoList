import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import "./Tasks.css";
function Tasks(props) {
  const idDetail = useSelector((state) => state.important.idTasks);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const tasksArrTotal = useSelector((state) => state.important.tasksArr);
  const tasksArr = tasksArrTotal.filter((ele) => ele.isDone !== true);
  const tasksArrCompleted = tasksArrTotal.filter((ele) => ele.isDone === true);
  const showCompleted = useSelector((state) => state.important.showCompleted);
  const {
    value: enteredTasks,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetTasksInput,
    isValid: enteredTasksIsvalid,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredTasksIsvalid) {
    formIsvalid = true;
  }

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      isDone: false,
      isImportant: false,
      isMyday: false,
      isPlanned: false,
      isTasks: true,
      id: id,
      tasks: enteredTasks,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetTasksInput();
  };

  ///////////////////////////////////////
  //ham chọn việc quan trọng
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
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    const isDone = ele.isDone;
    dispatch(importantAction.showDetail({ tasksName, idDetail }));
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
  const showCompletedHandler = () => {
    dispatch(importantAction.showCompleted());
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
      <div className="mydayBorder ">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            <i className="fa-solid fa-house"></i> <span>Tasks</span>
            <span
              className="fa-solid fa-ellipsis dotpadding"
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            />
          </p>
        </div>
        <div className="fll lineTasks1">
          <p className="textColorImportant">
            <span>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </span>
            <span>Sort</span>
          </p>
        </div>
      </div>
      <div className="formSubmitMyday">
        <form onSubmit={submitHandler}>
          <div className="totalInputTask">
            <div className="inputTasks">
              <i className="fa-regular fa-circle"></i>
              <input
                placeholder="Add a tasks"
                onChange={changeHandler}
                onBlur={blurHandler}
                value={enteredTasks}
              />
            </div>

            {/* ///////////////////// */}
            <div className="iconMydayAdd">
              <div className="textGray fll iconWidth">
                <i className="fa-solid fa-calendar-days"></i>
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <div className="fll" id="btnAdd">
                <button disabled={!formIsvalid}>Add</button>
              </div>
            </div>
          </div>
          {/* ///////// hiển thị tất cả các tasks///////// */}
          <div className="tasksArrList">
            {[...tasksArr].reverse().map((ele) => {
              return (
                <div
                  className="borderTasksArr"
                  key={ele.id}
                  onClick={() => showTasksDetailHandler(ele)}
                >
                  <div className="fll iconLine">
                    <i
                      className="fa-regular fa-circle "
                      onClick={(event) => isDoneHandler(ele, event)}
                    ></i>
                  </div>
                  <div className="fll taskName">
                    <span
                      className={`${
                        !ele.isMyday &&
                        displayStep(ele).stepDetail.length === 0 &&
                        "tasksLine"
                      }`}
                    >
                      {ele.tasks}
                    </span>
                    <br />
                    <span className="mydayFontsize">
                      {ele.isMyday && (
                        <span>
                          <span className="fa-regular fa-sun" />
                          My Day
                        </span>
                      )}
                      {displayStep(ele).stepDetail.length !== 0 &&
                        ele.isMyday === true && (
                          <span>
                            .{" "}
                            {displayStep(ele).stepDetail.length ===
                              displayStep(ele).stepDetailCompleted.length && (
                              <span className="fa-regular fa-circle-check" />
                            )}{" "}
                            {displayStep(ele).stepDetailCompleted.length} of{" "}
                            {displayStep(ele).stepDetail.length}
                          </span>
                        )}
                      {displayStep(ele).stepDetail.length !== 0 &&
                        ele.isMyday === false && (
                          <span>
                            {displayStep(ele).stepDetail.length ===
                              displayStep(ele).stepDetailCompleted.length && (
                              <span className="fa-regular fa-circle-check" />
                            )}{" "}
                            {displayStep(ele).stepDetailCompleted.length} of{" "}
                            {displayStep(ele).stepDetail.length}
                          </span>
                        )}
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
            <br />
            {/* Completed */}
            {tasksArrCompleted.length > 0 && (
              <div onClick={showCompletedHandler} className="completed">
                {!showCompleted ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span>Completed</span> <span>{tasksArrCompleted.length}</span>
              </div>
            )}
            {showCompleted && (
              <div>
                {tasksArrCompleted.map((ele) => {
                  return (
                    <div
                      className="borderTasksArr"
                      key={ele.id}
                      onClick={() => showTasksDetailHandler(ele)}
                    >
                      <div className="fll iconLine">
                        <i
                          style={{ color: "blue" }}
                          className="fa-solid fa-circle-check"
                          onClick={(event) => isDoneHandler(ele, event)}
                        ></i>
                      </div>
                      <div className="fll taskName">
                        <span
                          className={`${
                            !ele.isMyday &&
                            displayStep(ele).stepDetail.length === 0 &&
                            "tasksLine"
                          } checked`}
                        >
                          {" "}
                          {ele.tasks}
                        </span>
                        <br />
                        <span className="mydayFontsize">
                          {ele.isMyday && (
                            <span>
                              <span className="fa-regular fa-sun" />
                              My Day
                            </span>
                          )}
                          {displayStep(ele).stepDetail.length !== 0 &&
                            ele.isMyday === true && (
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
                          {displayStep(ele).stepDetail.length !== 0 &&
                            ele.isMyday === false && (
                              <span>
                                {displayStep(ele).stepDetail.length ===
                                  displayStep(ele).stepDetailCompleted
                                    .length && (
                                  <span className="fa-regular fa-circle-check" />
                                )}{" "}
                                {displayStep(ele).stepDetailCompleted.length} of{" "}
                                {displayStep(ele).stepDetail.length}
                              </span>
                            )}
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
    </React.Fragment>
  );
}

export default Tasks;
