import { configureStore } from "@reduxjs/toolkit";
import importantReducer from "./important";
import completedReducer from "./completed";
const store = configureStore({
  reducer: {
    important: importantReducer,
    completed: completedReducer,
  },
});
export default store;
