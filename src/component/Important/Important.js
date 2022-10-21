import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import "./Important.css";
function Important() {
  const dispatch = useDispatch();
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const tasksImportant = tasksArr.filter((ele) => ele.isImportant === true);
  console.log(tasksImportant);
  const {
    value: enteredImportant,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetImportantInput,
    isValid: enteredImportantIsvalid,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredImportantIsvalid) {
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
      isImportant: true,
      isMyday: false,
      isPlanned: false,
      isTasks: false,
      id: id,
      tasks: enteredImportant,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetImportantInput();
  };
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const id = ele.id;
    dispatch(importantAction.important({ id }));
  };
  return (
    <React.Fragment>
      <div className="mydayBorder">
        <div className="fll marginTMyday lineTasks" id="sizeText">
          <p className="textColorImportant">
            <i className="fa-regular fa-star ipadding"></i>
            Important
            <button>...</button>
          </p>
        </div>
        <div className="marginTMyday fll lineTasks1">
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
                value={enteredImportant}
              />
            </div>
            {/* ///////////////////// */}
            <div className="iconMydayAdd">
              <div className="textGray fll iconWidth">
                <i className="fa-solid fa-calendar-days"></i>
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <div className="fll" id="ffl">
                <button disabled={!formIsvalid}>Add</button>
              </div>
            </div>
          </div>
          {/* ////////////////// */}
          <div className="tasksArrList">
            {tasksImportant.map((ele) => {
              return (
                <div
                  className="borderTasksArr"
                  key={ele.id}
                  // onClick={() => showTasksDetailHandler(ele)}
                >
                  <div className="fll iconLine">
                    <i className="fa-regular fa-circle "></i>
                  </div>
                  <div className="fll taskName">
                    <span> {ele.tasks}</span>
                    <br />
                    <span className="textSize">Tasks</span>
                  </div>
                  <div className={`fll iconLineStar`}>
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
        </form>
      </div>
    </React.Fragment>
  );
}

export default Important;
