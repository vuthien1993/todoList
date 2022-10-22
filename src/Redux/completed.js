import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDone: false,
  showCompleted: false,
};
const completed = createSlice({
  name: "completed",
  initialState,
  reducers: {
    showCompletedDetail(state) {
      state.isDone = !state.isDone;
    },
    //an hien viec hoan thanh
    showCompleted(state) {
      state.showCompleted = !state.showCompleted;
    },
  },
});

export const completedAction = completed.actions;
export default completed.reducer;
