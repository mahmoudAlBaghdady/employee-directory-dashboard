import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDepartments,
    createDepartment,
    getSingleDepartment,
    updateDepartment
} from "./departmentAPI";

export const createAsyncDepartment = createAsyncThunk(
    "department/createDepartment",
    async (data) => {
      const response = await createDepartment(data);
      return response;
    }
  );
export const fetchAsyncDepartments = createAsyncThunk(
  "department/getDepartments",
  async (data) => {
    const response = await getDepartments(data);
    return response;
  }
);
export const fetchAsyncSingleDepartment = createAsyncThunk(
  "department/getSingleDepartment",
  async (data) => {
    const response = await getSingleDepartment(data);
    return response;
  }
);
export const updateAsyncDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (data) => {
    const response = await updateDepartment(data);
    return response;
  }
);

const initialState = {
    allDepartments: [],        // Array to store the fetched list of Departments
    singleDepartment: {},      // Object to store details of a single department
    
    // Status and error fields for each operation
    createStatus: 'idle',    // 'idle', 'loading', 'succeeded', 'failed'
    fetchStatus: 'idle',     // For fetching all Departments
    fetchSingleStatus: 'idle',// For fetching a single deparments's details
    updateStatus: 'idle',    // For updating department information

    // Error messages for operations
    createError: null,
    fetchError: null,
    fetchSingleError: null,
    updateError: null,
  };
const DepartmentSlice = createSlice({
  name: "Department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Handling create deparment
    .addCase(createAsyncDepartment.pending, (state) => {
      state.createStatus = 'loading';
    })
    .addCase(createAsyncDepartment.fulfilled, (state, action) => {
      state.createStatus = 'succeeded';
      state.allDepartments.push(action.payload.data); 
    })
    .addCase(createAsyncDepartment.rejected, (state, action) => {
      state.createStatus = 'failed';
      state.createError = action.error.message;
    })
    //get all departments
    .addCase(fetchAsyncDepartments.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchAsyncDepartments.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.allDepartments=action.payload;
    })
    .addCase(fetchAsyncDepartments.rejected, (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    })
    //get all departments
    .addCase(fetchAsyncSingleDepartment.pending, (state) => {
      state.fetchSingleStatus = 'loading';
    })
    .addCase(fetchAsyncSingleDepartment.fulfilled, (state, action) => {
      state.fetchSingleStatus = 'succeeded';
      state.singleDepartment=action.payload;
    })
    .addCase(fetchAsyncSingleDepartment.rejected, (state, action) => {
      state.fetchSingleStatus = 'failed';
      state.fetchSingleError = action.error.message;
    })
    //update departments
    .addCase(updateAsyncDepartment.pending, (state) => {
      state.updateStatus = 'loading';
    })
    .addCase(updateAsyncDepartment.fulfilled, (state, action) => {
      state.updateStatus = 'succeeded';
    })
    .addCase(updateAsyncDepartment.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.error.message;
    })
  },
});

// Selector for all Departments
export const selectAllDepartment = (state) => state.Department.allDepartments;

// Selector for single Department details
export const selectSingleDepartment = (state) => state.Department.singleDepartment;

export default DepartmentSlice.reducer;