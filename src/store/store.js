import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./employee/EmployeeSlice";
import DepartmentSlice from "./department/DepartmentSlice";
import LocationSlice from "./location/LocationSlice";

export const store = configureStore({
  reducer: {
    Employee: EmployeeSlice,
    Department:DepartmentSlice,
    Location:LocationSlice
  },
});
