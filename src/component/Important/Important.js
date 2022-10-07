import React from "react";
import useInput from "../../hook/use-input";
import "./Important.css";
function Important() {
  const {
    value: enteredTasks,
    isValid: enteredTasksIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetTasksInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredTasksIsvalid) {
    formIsvalid = true;
  }
  return (
    <React.Fragment>
      <div className="row mydayBorder">
        <div className="col-md-10 marginTMyday">
          <h5 className="textColorImportant">
            <i className="fa-regular fa-star ipadding"></i>
            Important
            <button>...</button>
          </h5>
        </div>
        <div className="col-md-2 marginTMyday">
          <p className="textColorImportant">
            <span>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </span>
            <span>Sort</span>
          </p>
        </div>
        <form>
          <div className="inputTasks">
            <i className="fa-regular fa-circle"></i>
            <input placeholder="Add a tasks" />
          </div>
          <div className="row iconMydayAdd">
            <div className="col-md-11">
              <i className="fa-solid fa-calendar-days"></i>
              <i class="fa-regular fa-bell"></i>
              <i class="fa-solid fa-arrows-rotate"></i>
            </div>
            <div className="col-md-1">
              <button disabled={!formIsvalid}>Add</button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Important;
