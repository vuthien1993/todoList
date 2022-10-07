import React from "react";
import useInput from "../../hook/use-input";
function Planned() {
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
        <div className="marginTMyday">
          <h5 className="textColorImportant">
            <i className="fa-solid fa-calendar-days ipadding" />
            Planned
            <button>...</button>
          </h5>
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

export default Planned;
