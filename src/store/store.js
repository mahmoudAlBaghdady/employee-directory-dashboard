import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./employee/EmployeeSlice";

export const store = configureStore({
  reducer: {
    Employee: EmployeeSlice,
  },
});
