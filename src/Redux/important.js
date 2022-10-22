import { createSlice } from "@reduxjs/toolkit";

const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];

const initialState = {
  isDone: false,
  idTasks: "",
  isImportant: false,
  showTasksDetail: false,
  tasksName: "",
  tasksArr,
  showCompleted: false,
};
const important = createSlice({
  name: "important",
  initialState,
  reducers: {
    //add task
    addtasks(state, { payload }) {
      const newTasks = payload.tasksItem;
      state.tasksArr = [...state.tasksArr, newTasks];
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //xoa task
    deleteTask(state, { payload }) {
      const index = state.tasksArr.findIndex((ele) => ele.id === payload.id);
      state.tasksArr.splice(index, 1);
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //tich chon star o moi task
    important(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idI ? { ...ele, isImportant: !ele.isImportant } : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //ham tich chon star o modal detail
    importantDetail(state) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === state.idTasks
          ? { ...ele, isImportant: !ele.isImportant }
          : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
      state.isImportant = !state.isImportant;
    },
    //hien thi chi tiet task
    showDetail(state, { payload }) {
      state.showTasksDetail = true;
      state.tasksName = payload.tasksName;
      state.isImportant = payload.isImportant;
      state.idTasks = payload.idDetail;
    },
    //ht viec quan trong o modaldetail
    showImportantDetail(state, { payload }) {
      state.isImportant = payload.isImportant;
      state.isDone = payload.isDone;
    },
    //an chi tiet
    hidenDetail(state) {
      state.showTasksDetail = false;
    },
    //danh dau viec da hoan thanh
    complete(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idC ? { ...ele, isDone: !ele.isDone } : ele
      );
      state.tasksArr = updateArr;
      state.isDone = !state.isDone;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //an hien viec hoan thanh
    showCompleted(state) {
      state.showCompleted = !state.showCompleted;
    },
  },
});

export const importantAction = important.actions;
export default important.reducer;
