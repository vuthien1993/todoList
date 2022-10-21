import { configureStore } from "@reduxjs/toolkit";
import importantReducer from "./important";
const store = configureStore({
  reducer: {
    important: importantReducer,
  },
});
export default store;
