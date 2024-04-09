import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getLocations,
    createLocation,
    getSingleLocation,
    updateLocation
} from "./locationAPI";

export const createAsyncLocation = createAsyncThunk(
    "location/createLocation",
    async (data) => {
      const response = await createLocation(data);
      return response;
    }
  );
export const fetchAsyncLocations = createAsyncThunk(
  "location/getLocations",
  async (data) => {
    const response = await getLocations(data);
    return response;
  }
);
export const fetchAsyncSingleLocation = createAsyncThunk(
  "location/getSingleLocation",
  async (data) => {
    const response = await getSingleLocation(data);
    return response;
  }
);
export const updateAsyncLocation = createAsyncThunk(
  "location/updateLocation",
  async (data) => {
    const response = await updateLocation(data);
    return response;
  }
);

const initialState = {
    allLocations: [],        // Array to store the fetched list of Locations
    singleLocation: {},      // Object to store details of a single Location
    
    // Status and error fields for each operation
    createStatus: 'idle',    // 'idle', 'loading', 'succeeded', 'failed'
    fetchStatus: 'idle',     // For fetching all Locations
    fetchSingleStatus: 'idle',// For fetching a single location's details
    updateStatus: 'idle',    // For updating Location information

    // Error messages for operations
    createError: null,
    fetchError: null,
    fetchSingleError: null,
    updateError: null,
  };
const LocationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Handling create location
    .addCase(createAsyncLocation.pending, (state) => {
      state.createStatus = 'loading';
    })
    .addCase(createAsyncLocation.fulfilled, (state, action) => {
      state.createStatus = 'succeeded';
      state.allLocations.push(action.payload.data); 
    })
    .addCase(createAsyncLocation.rejected, (state, action) => {
      state.createStatus = 'failed';
      state.createError = action.error.message;
    })
    //get all Locations
    .addCase(fetchAsyncLocations.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchAsyncLocations.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.allLocations=action.payload;
    })
    .addCase(fetchAsyncLocations.rejected, (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    })
    //get all Locations
    .addCase(fetchAsyncSingleLocation.pending, (state) => {
      state.fetchSingleStatus = 'loading';
    })
    .addCase(fetchAsyncSingleLocation.fulfilled, (state, action) => {
      state.fetchSingleStatus = 'succeeded';
      state.singleLocation=action.payload;
    })
    .addCase(fetchAsyncSingleLocation.rejected, (state, action) => {
      state.fetchSingleStatus = 'failed';
      state.fetchSingleError = action.error.message;
    })
    //update Locations
    .addCase(updateAsyncLocation.pending, (state) => {
      state.updateStatus = 'loading';
    })
    .addCase(updateAsyncLocation.fulfilled, (state, action) => {
      state.updateStatus = 'succeeded';
    })
    .addCase(updateAsyncLocation.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.error.message;
    })
  },
});

// Selector for all Locations
export const selectAllLocation = (state) => state.Location.allLocations;

// Selector for single Location details
export const selectSingleLocation = (state) => state.Location.singleLocation;

export default LocationSlice.reducer;