import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createEmployee,
    getEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    AddToFavoritesEmployee,
    removeFromFavoritesEmployee,
    getFavoriteEmployees,
    searchEmployees
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

export const addToFavoritesAsync = createAsyncThunk(
    "employee/addToFavorites",
    async (data) => {
        const response = await AddToFavoritesEmployee(data);
        return response.data;
    }
);

export const removeFromFavoritesAsync = createAsyncThunk(
    "employee/removeFromFavorites",
    async (data) => {
        const response = await removeFromFavoritesEmployee(data);
        return response.data;
    }
);

export const fetchFavoriteEmployeesAsync = createAsyncThunk(
    "employee/fetchFavoriteEmployees",
    async (data) => {
        const response = await getFavoriteEmployees(data);
        return response.data;
    }
);

export const searchEmployeesAsync = createAsyncThunk(
    "employee/searchEmployees",
    async (data) => {
        const response = await searchEmployees(data);
        return response.data;
    }
);

const initialState = {
    allEmployees: [],        // Array to store the fetched list of employees
    singleEmployee: {},      // Object to store details of a single employee
    favoriteEmployees: [],   // Array to store favorite employees if needed
    searchResults: [],       // Array to store results of a search operation
  
    // Status and error fields for each operation
    createStatus: 'idle',    // 'idle', 'loading', 'succeeded', 'failed'
    fetchStatus: 'idle',     // For fetching all employees
    fetchSingleStatus: 'idle',// For fetching a single employee's details
    updateStatus: 'idle',    // For updating employee information
    deleteStatus: 'idle',    // For deleting an employee
    favoritesStatus: 'idle', // For add/remove from favorites operations
    searchStatus: 'idle',    // For search operation
  
    // Error messages for operations
    createError: null,
    fetchError: null,
    fetchSingleError: null,
    updateError: null,
    deleteError: null,
    favoritesError: null,
    searchError: null,
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
      state.allEmployees.push(action.payload.data); 
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
      console.log("success")
        console.log("action.payload",action.payload)
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
      state.allEmployees = state.allEmployees.filter(employee => employee.id !== action.meta.arg.id);
    })
    .addCase(deleteAsyncEmployee.rejected, (state, action) => {
      state.deleteStatus = 'failed';
      state.deleteError = action.error.message;
    })

    // Handling add to favorites
    .addCase(addToFavoritesAsync.pending, (state) => {
      state.favoritesStatus = 'loading';
    })
    .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
      state.favoritesStatus = 'succeeded';
    })
    .addCase(addToFavoritesAsync.rejected, (state, action) => {
      state.favoritesStatus = 'failed';
      state.favoritesError = action.error.message;
    })

    // Handling remove from favorites
    .addCase(removeFromFavoritesAsync.pending, (state) => {
      state.favoritesStatus = 'loading';
    })
    .addCase(removeFromFavoritesAsync.fulfilled, (state, action) => {
      state.favoritesStatus = 'succeeded';
    })
    .addCase(removeFromFavoritesAsync.rejected, (state, action) => {
      state.favoritesStatus = 'failed';
      state.favoritesError = action.error.message;
    })

    // Handling fetch favorite employees
    .addCase(fetchFavoriteEmployeesAsync.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchFavoriteEmployeesAsync.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.favoriteEmployees = action.payload; 
    })
    .addCase(fetchFavoriteEmployeesAsync.rejected, (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    })

    // Handling search employees
    .addCase(searchEmployeesAsync.pending, (state) => {
      state.searchStatus = 'loading';
    })
    .addCase(searchEmployeesAsync.fulfilled, (state, action) => {
      state.searchStatus = 'succeeded';
      state.searchResults = action.payload; 
    })
    .addCase(searchEmployeesAsync.rejected, (state, action) => {
      state.searchStatus = 'failed';
      state.searchError = action.error.message;
    });
  },
});

// Selector for all employees
export const selectAllEmployees = (state) => state.Employee.allEmployees;

// Selector for single Employee details
export const selectSingleEmployee = (state) => state.Employee.singleEmployee;

// Selector for favorite employees
export const selectFavoriteEmployees = (state) => state.Employee.favoriteEmployees;

// Selector for search results
export const selectSearchResults = (state) => state.Employee.searchResults;

// Selectors for operation statuses
export const selectCreateStatus = (state) => state.Employee.createStatus;
export const selectFetchStatus = (state) => state.Employee.fetchStatus;
export const selectFetchSingleStatus = (state) => state.Employee.fetchSingleStatus;
export const selectUpdateStatus = (state) => state.Employee.updateStatus;
export const selectDeleteStatus = (state) => state.Employee.deleteStatus;
export const selectFavoritesStatus = (state) => state.Employee.favoritesStatus;
export const selectSearchStatus = (state) => state.Employee.searchStatus;

// Selectors for operation errors
export const selectCreateError = (state) => state.Employee.createError;
export const selectFetchError = (state) => state.Employee.fetchError;
export const selectFetchSingleError = (state) => state.Employee.fetchSingleError;
export const selectUpdateError = (state) => state.Employee.updateError;
export const selectDeleteError = (state) => state.Employee.deleteError;
export const selectFavoritesError = (state) => state.Employee.favoritesError;
export const selectSearchError = (state) => state.Employee.searchError;

export const getStatus = (state) => state.Employee.status;
export default EmployeeSlice.reducer;