import axios from 'axios';
import Swal from "sweetalert2";

const API_ENDPOINT = process.env.REACT_APP_API_URL;
// Create employee
export async function createEmployee(data) {
    try {
        const response = await axios.post(`${API_ENDPOINT}/employees/`, data, {
            headers: {'Content-Type': 'application/json'},
        });
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
        const {page, limit, search} = data;
        let response;
        if(search.trim() === ''){
             response = await axios.get(`${API_ENDPOINT}/employees?page=${page}&limit=${limit}`, {
                headers: {'Content-Type': 'application/json'},
            });
        }else{
             response = await axios.get(`${API_ENDPOINT}/employees?page=${page}&limit=${limit}&search=${search}`, {
                headers: {'Content-Type': 'application/json'},
            });
        }
        
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
        const response = await axios.get(`${API_ENDPOINT}/employees/${id}`, {
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
        const {id, payload} = data;
        console.log("data update",data);
        console.log("payload update",payload);

        const response = await axios.patch(`${API_ENDPOINT}/employees/${id}`, payload, {
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
        const response = await axios.delete(`${API_ENDPOINT}/employees/${id}`, {
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
