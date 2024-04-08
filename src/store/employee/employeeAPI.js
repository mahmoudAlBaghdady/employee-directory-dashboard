import axios from 'axios';
import Swal from "sweetalert2";

// Create employee
const API_ENDPOINT = "http://localhost:3002/api";
export async function createEmployee(data) {
    try {
        const response = await axios.post(`${API_ENDPOINT}/employees/`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee created successfully!",
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
// Get Employees
export async function getEmployees(data) {
    try {
        const {page, limit} = data;
        const response = await axios.get(`${API_ENDPOINT}/employees/page/${page}/limit/${limit}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
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
// Get Single Employee by ID
export async function getSingleEmployee(data) {
    try {
        const {id} = data;
        const response = await axios.get(`${API_ENDPOINT}/employees/${id}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
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

// Update Employee by ID
export async function updateEmployee(data) {
    try {
        const {id} = data;
        const response = await axios.patch(`${API_ENDPOINT}/employees/${id}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Updated successfully!",
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

// Delete Employee by ID
export async function deleteEmployee(data) {
    try {
        const {id} = data;
        const response = await axios.delete(`${API_ENDPOINT}/employees/${id}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Deleted successfully!",
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

// Add Employee to Favorites
export async function AddToFavoritesEmployee(data) {
    try {
        const {id} = data;
        const response = await axios.patch(`${API_ENDPOINT}/employees/${id}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Added To Favorites successfully!",
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


// Remove Employee from Favorites
export async function removeFromFavoritesEmployee(data) {
    try {
        const {id} = data;
        const response = await axios.patch(`${API_ENDPOINT}/employees/${id}/favorite/remove`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Removed From Favorites successfully!",
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

// get All Favorite Employees
export async function getFavoriteEmployees(data) {
    try {
        const {page, limit} = data;
        const response = await axios.patch(`${API_ENDPOINT}/employees/favorites/all/page/${page}/limit/${limit}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
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
// get All Employees by search
export async function searchEmployees(data) {
    try {
        const {queryparams} = data;
        const response = await axios.patch(`${API_ENDPOINT}/employees/search/${queryparams}`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        console.log("POST call succeeded: ", response);
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
