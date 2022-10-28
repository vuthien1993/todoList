import { createSlice } from "@reduxjs/toolkit";

const nextStepArr = JSON.parse(localStorage.getItem("nextStepArr")) ?? [];
const initialState = {
  nextStepArr,
};
const nextStep = createSlice({
  name: "nextStep",
  initialState,
  reducers: {
    //add step
    addStep(state, { payload }) {
      const newStep = payload.stepItem;
      state.nextStepArr = [...state.nextStepArr, newStep];
      localStorage.setItem("nextStepArr", JSON.stringify(state.nextStepArr));
    },
    //delete step
    deleteStep(state, { payload }) {
      const index = state.nextStepArr.findIndex((ele) => ele.id === payload.id);
      state.nextStepArr.splice(index, 1);
      localStorage.setItem("nextStepArr", JSON.stringify(state.nextStepArr));
    },
    //ham xoa stepidDetail
    deleteStepDetail(state, { payload }) {
      const stepDetail = state.nextStepArr.filter(
        (ele) => ele.idDetail === payload.id
      );
      const index = state.nextStepArr.findIndex(
        (ele) => ele.idDetail === payload.id
      );
      state.nextStepArr.splice(index, stepDetail.length);
      localStorage.setItem("nextStepArr", JSON.stringify(state.nextStepArr));
    },
    // da hoan thanh
    completed(state, { payload }) {
      const newStep = state.nextStepArr.map((ele) =>
        ele.id === payload.idC ? { ...ele, isDone: !ele.isDone } : ele
      );
      state.nextStepArr = newStep;
      localStorage.setItem("nextStepArr", JSON.stringify(state.nextStepArr));
    },
  },
});

export const nextStepAction = nextStep.actions;
export default nextStep.reducer;
