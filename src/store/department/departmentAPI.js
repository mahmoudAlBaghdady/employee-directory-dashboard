import axios from 'axios';
import Swal from "sweetalert2";

const API_ENDPOINT = process.env.REACT_APP_API_URL;
// Create Departments
console.log("API_ENDPOINT",API_ENDPOINT)
export async function createDepartment(data) {
    try {
        const response = await axios.post(`${API_ENDPOINT}/departments/`, data, {
            headers: {'Content-Type': 'application/json'},
        });
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Department created successfully!",
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
// Get Departments
export async function getDepartments() {
    try {
        let {data} = await axios.get(`${API_ENDPOINT}/departments`, {
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
// Get Single Department by ID
export async function getSingleDepartment(data) {
    try {
        const {id} = data;
        console.log("id",id)
        const response = await axios.get(`${API_ENDPOINT}/departments/${id}`, {
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
// Update Department by ID
export async function updateDepartment(data) {
    try {
        const {id, name} = data;
        const body ={name}
        const response = await axios.patch(`${API_ENDPOINT}/departments/${id}`, body, {
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