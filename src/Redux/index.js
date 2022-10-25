import { configureStore } from "@reduxjs/toolkit";
import importantReducer from "./important";
import completedReducer from "./completed";
import nextStepReducer from "./nextStep";
const store = configureStore({
  reducer: {
    important: importantReducer,
    completed: completedReducer,
    nextStep: nextStepReducer,
  },
});
export default store;
