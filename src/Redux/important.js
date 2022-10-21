import { createSlice } from "@reduxjs/toolkit";

const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];

const initialState = {
  idTasks: "",
  isImportant: false,
  showTasksDetail: false,
  tasksName: "",
  tasksArr,
};
const important = createSlice({
  name: "important",
  initialState,
  reducers: {
    addtasks(state, { payload }) {
      const newTasks = payload.tasksItem;
      state.tasksArr = [...state.tasksArr, newTasks];
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    deleteTask(state, { payload }) {
      const index = state.tasksArr.findIndex((ele) => ele.id === payload.id);
      state.tasksArr.splice(index, 1);
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    important(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idI ? { ...ele, isImportant: !ele.isImportant } : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
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
    showDetail(state, { payload }) {
      state.showTasksDetail = true;
      state.tasksName = payload.tasksName;
      state.isImportant = payload.isImportant;
      state.idTasks = payload.idDetail;
    },
    showImportantDetail(state, { payload }) {
      state.isImportant = payload.isImportant;
    },
    hidenDetail(state) {
      state.showTasksDetail = false;
    },
  },
});

export const importantAction = important.actions;
export default important.reducer;
