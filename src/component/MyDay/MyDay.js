import React, { useState } from "react";
import moment from "moment/moment";
import useInput from "../../hook/use-input";
import ModalDelete from "../modalDelete/ModalDelete";
import "./MyDay.css";

function MyDay() {
  const [showStar, setShowStar] = useState(true);
  const [show, setShow] = useState(false);
  // lay data tu localstorage
  const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];
  console.log(tasksArr);
  //khai bao mang chua data
  const [tasks, setTasks] = useState(tasksArr);
  //khai bao lay gia tri thoi gian thuc
  const d = moment().format("dddd, MMMM Do");
  //khai bao su dung custom hook
  const [id, setId] = useState("");
  const [tasksTodo, setTasksTodo] = useState("");
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

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      id: id,
      tasks: enteredTasks,
    };
    setTasks((pre) => {
      console.log(pre);
      const newTasks = [...pre, tasksItem];
      localStorage.setItem("tasksArr", JSON.stringify(newTasks));
      return newTasks;
    });
    console.log(tasks);
    resetTasksInput();
  };
  const deleteHandler = () => {
    const index = tasksArr.findIndex((ele) => id === ele.id);
    tasksArr.splice(index, 1);
    //set lại state vi moi state chỉ khởi tạo giá trị ban đầu 1 lần duy nhất
    setTasks(tasksArr);
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
    setShow(false);
  };
  const showHandler = (ele) => {
    setShow(true);
    setId(ele.id);
    setTasksTodo(ele.tasks);
  };
  const hiddenModal = () => {
    setShow(false);
  };
  //xử lý riêng từng sự kiện trong div tổng
  const testHandler = (e) => {
    setShowStar((pre) => !pre);
    e.stopPropagation();
  };
  return (
    <React.Fragment>
      {show && (
        <ModalDelete
          onHidden={hiddenModal}
          onDelete={deleteHandler}
          tasksArr={tasksArr}
          id={id}
          tasks={tasksTodo}
        />
      )}
      <div className="row mydayBorder">
        <div className="col-md-8 marginTMyday">
          <h5>
            <i className="fa-regular fa-sun ipadding"></i>My Day{" "}
            <span>...</span>
          </h5>
          <p className="textGray">{d}</p>
        </div>
        <div className="col-md-4 marginTMyday">
          <div className="textGray">
            <span>
              <span>
                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </span>
              <span>Sort</span>
            </span>
            <span className="spanHover">
              <span className="ipadding">
                <span className="fa-solid fa-neuter" />
                Suggestions
              </span>
            </span>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="inputTasks">
            <i className="fa-regular fa-circle"></i>
            <input
              placeholder="Add a tasks"
              value={enteredTasks}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
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
          <div className="borderTasksArr">
            {tasksArr.map((ele) => {
              return (
                <div
                  key={ele.id}
                  className="tasksArrList row"
                  onClick={() => showHandler(ele)}
                >
                  <div className="col-md-1">
                    <i className="fa-regular fa-circle"></i>
                  </div>
                  <div className="col-md-10">
                    <p> {ele.tasks}</p>
                    <p className="textSize">Tasks</p>
                  </div>
                  <div className="col-md-1" onClick={testHandler}>
                    {showStar && <i className="fa-regular fa-star"></i>}
                    {!showStar && <i class="fa-solid fa-star"></i>}
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

export default MyDay;
