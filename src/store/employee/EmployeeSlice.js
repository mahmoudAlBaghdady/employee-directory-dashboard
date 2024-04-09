import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createEmployee,
    getEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
} from "./employeeAPI";

export const createAsyncEmployee = createAsyncThunk(
    "employee/createEmployee",
    async (data) => {
      const response = await createEmployee(data);
      return response;
    }
  );
  export const fetchAsyncEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (data) => {
        const response = await getEmployees(data);
        return response.data;
    }
);

export const fetchAsyncSingleEmployee = createAsyncThunk(
    "employee/fetchSingleEmployee",
    async (data) => {
        const response = await getSingleEmployee(data);
        return response.data;
    }
);

export const updateAsyncEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (data) => {
        const response = await updateEmployee(data);
        return response.data;
    }
);

export const deleteAsyncEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (data) => {
        const response = await deleteEmployee(data);
        return response.data;
    }
);


const initialState = {
    allEmployees: [],        // Array to store the fetched list of employees
    singleEmployee: {},      // Object to store details of a single employee
  
    // Status and error fields for each operation
    createStatus: 'idle',    // 'idle', 'loading', 'succeeded', 'failed'
    fetchStatus: 'idle',     // For fetching all employees
    fetchSingleStatus: 'idle',// For fetching a single employee's details
    updateStatus: 'idle',    // For updating employee information
    deleteStatus: 'idle',    // For deleting an employee
  
    // Error messages for operations
    createError: null,
    fetchError: null,
    fetchSingleError: null,
    updateError: null,
    deleteError: null,
  };
const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Handling create employee
    .addCase(createAsyncEmployee.pending, (state) => {
      state.createStatus = 'loading';
    })
    .addCase(createAsyncEmployee.fulfilled, (state, action) => {
      state.createStatus = 'succeeded';
    })
    .addCase(createAsyncEmployee.rejected, (state, action) => {
      state.createStatus = 'failed';
      state.createError = action.error.message;
    })

    // Handling fetch employees
    .addCase(fetchAsyncEmployees.pending, (state) => {
        console.log("loading")
      state.fetchStatus = 'loading';
    })
    .addCase(fetchAsyncEmployees.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.allEmployees = action.payload; 
    })
    .addCase(fetchAsyncEmployees.rejected, (state, action) => {
      console.log("failed")
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    })

    // Handling fetch single employee
    .addCase(fetchAsyncSingleEmployee.pending, (state) => {
      state.fetchSingleStatus = 'loading';
    })
    .addCase(fetchAsyncSingleEmployee.fulfilled, (state, action) => {
      state.fetchSingleStatus = 'succeeded';
      state.singleEmployee = action.payload; 
    })
    .addCase(fetchAsyncSingleEmployee.rejected, (state, action) => {
      state.fetchSingleStatus = 'failed';
      state.fetchSingleError = action.error.message;
    })

    // Handling update employee
    .addCase(updateAsyncEmployee.pending, (state) => {
      state.updateStatus = 'loading';
    })
    .addCase(updateAsyncEmployee.fulfilled, (state, action) => {
      state.updateStatus = 'succeeded';
    })
    .addCase(updateAsyncEmployee.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.error.message;
    })

    // Handling delete employee
    .addCase(deleteAsyncEmployee.pending, (state) => {
      state.deleteStatus = 'loading';
    })
    .addCase(deleteAsyncEmployee.fulfilled, (state, action) => {
      state.deleteStatus = 'succeeded';
    })
    .addCase(deleteAsyncEmployee.rejected, (state, action) => {
      state.deleteStatus = 'failed';
      state.deleteError = action.error.message;
    })
  },
});

// Selector for all employees
export const selectAllEmployees = (state) => state.Employee.allEmployees;

// Selector for single Employee details
export const selectSingleEmployee = (state) => state.Employee.singleEmployee;

// Selectors for operation statuses
export const selectCreateStatus = (state) => state.Employee.createStatus;
export const selectFetchStatus = (state) => state.Employee.fetchStatus;
export const selectFetchSingleStatus = (state) => state.Employee.fetchSingleStatus;
export const selectUpdateStatus = (state) => state.Employee.updateStatus;
export const selectDeleteStatus = (state) => state.Employee.deleteStatus;

// Selectors for operation errors
export const selectCreateError = (state) => state.Employee.createError;
export const selectFetchError = (state) => state.Employee.fetchError;
export const selectFetchSingleError = (state) => state.Employee.fetchSingleError;
export const selectUpdateError = (state) => state.Employee.updateError;
export const selectDeleteError = (state) => state.Employee.deleteError;

export default EmployeeSlice.reducer;