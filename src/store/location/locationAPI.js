import axios from 'axios';
import Swal from "sweetalert2";

const API_ENDPOINT = process.env.REACT_APP_API_URL;

// Create Locations
export async function createLocation(data) {
    try {
        const response = await axios.post(`${API_ENDPOINT}/locations/`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Location created successfully!",
        });
        return response;
    } catch (error) {
        console.log("POST call failed: ", error);
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        });
    }
}
// Get Locations
export async function getLocations() {
    try {
        let {data} = await axios.get(`${API_ENDPOINT}/locations`, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", data);
        return data;
    } catch (error) {
        console.log("POST call failed: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
}
// Get Single Location by ID
export async function getSingleLocation(data) {
    try {
        const {id} = data;
        console.log("id",id)
        const response = await axios.get(`${API_ENDPOINT}/locations/${id}`, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        return response.data;
    } catch (error) {
        console.log("POST call failed: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
}
// Update Location by ID
export async function updateLocation(data) {
    try {
        const {id, name} = data;
        const body ={name}
        const response = await axios.patch(`${API_ENDPOINT}/locations/${id}`, body, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        return response.data;
    } catch (error) {
        console.log("POST call failed: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
}