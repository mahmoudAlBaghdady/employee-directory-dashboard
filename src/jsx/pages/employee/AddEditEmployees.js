import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from 'react-hook-form';
import { fetchAsyncLocations, selectAllLocation } from "../../../store/location/LocationSlice";
import { fetchAsyncDepartments, selectAllDepartment } from "../../../store/department/DepartmentSlice";
import { updateAsyncEmployee, createAsyncEmployee, fetchAsyncSingleEmployee, selectSingleEmployee, deleteAsyncEmployee } from "../../../store/employee/EmployeeSlice";
import Select from "react-select";
import Form from "react-bootstrap/Form";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Simple email regex
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; // Simple URL regex
const nameRegex=/^[A-Za-z\s]+$/; //Simple Name regex checks if only letters

const AddEditEmployees = () => {
    const { id: employeeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("emploeeID",employeeId)
    const locations = useSelector(selectAllLocation);
    const departments = useSelector(selectAllDepartment);
    let employeeDetails = useSelector(selectSingleEmployee);
    const { control, register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            jobTitle: '',
            pictureUrl: '',
            departmentId: '',
            locationId: '',
            isFavorite: false
        }
    });
  
    useEffect(() => {
        dispatch(fetchAsyncLocations());
        dispatch(fetchAsyncDepartments());
        if (employeeId) {
            // If in edit mode, fetch and populate the form with the employee's details
            dispatch(fetchAsyncSingleEmployee({ id: employeeId }));
        } else {
            // If in create mode, reset the form
            employeeDetails={}
            reset({
                name: '',
                email: '',
                jobTitle: '',
                pictureUrl: '',
                departmentId: '',
                locationId: '',
                isFavorite: false
            });
        }
    }, [dispatch, employeeId, reset]);

    useEffect(() => {
        if (employeeDetails) {
            Object.keys(employeeDetails).forEach(key => {
                setValue(key, employeeDetails[key]);
            });
        }
    }, [employeeDetails, setValue]);

    const handleSave = async (data) => {
        console.log("data",data);
        const {id, department, location, createdAt, updatedAt, ...submitData } = data;
        const payload = {
            ...submitData ,
            departmentId: departments.find(dep => dep.id === data.departmentId)?.id,
            locationId: locations.find(loc => loc.id === data.locationId)?.id,
        };
        if (employeeId) {
            await dispatch(updateAsyncEmployee({id,payload}));
        } else {
            await dispatch(createAsyncEmployee(payload));
        }
        navigate('/');
        
    };

    const deleteEmployee = async (e) => {
        console.log("employeeId",employeeId);
        if (employeeId) {
            await dispatch(deleteAsyncEmployee({id:employeeId}));
        } 
        navigate('/');
        
    };
    const departmentOptions = departments.map(dep => ({ value: dep.id, label: dep.name }));
    const locationOptions = locations.map(loc => ({ value: loc.id, label: loc.name }));

    return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-8">
                <div className="card profile-card card-bx m-b30">
                  <div className="card-header">
                    <h6 className="title">{employeeId ? 'Edit Employee' : 'Add New Employee'}</h6>
                  </div>
                  <form className="profile-form" onSubmit={handleSubmit(handleSave)}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                             {...register("name", { 
                                required: true,
                                pattern: {
                                    value: nameRegex,
                                    message: "Name Can Only Contain Letters"
                            }})} />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" {...register("email", { 
                                required: true ,
                                pattern: {
                                    value: emailRegex,
                                    message: "Invalid email address"
                                }})} />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Job Title</label>
                            <input type="text" className="form-control" 
                            {...register("jobTitle", { 
                                required: true,
                                pattern: {
                                    value: nameRegex,
                                    message: "Job Title Can Only Contain Letters"
                            }})} />
                            {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
                        </div>
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Image URL</label>
                            <input type="text" className="form-control"
                             {...register("pictureUrl", { 
                                required: true ,
                                pattern: {
                                    value: urlRegex,
                                    message: "Invalid URL"
                                }})} />
                            {errors.pictureUrl && <p>{errors.pictureUrl.message}</p>}
                        </div>
                        
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Department</label>
                            <Controller
                                name="departmentId"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <Select
                                    {...field}
                                    options={departmentOptions}
                                    value={departmentOptions.find(option => option.value === field.value)}
                                    onChange={val => field.onChange(val.value)}
                                />}
                            />
                        </div>
                        <div className="col-sm-6 m-b30">
                            <label className="form-label">Location</label>
                            <Controller
                                name="locationId"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <Select
                                    {...field}
                                    options={locationOptions}
                                    value={locationOptions.find(option => option.value === field.value)}
                                    onChange={val => field.onChange(val.value)}
                                />}
                            />
                        </div>
                        <div className="col-sm-6 m-b30">
                          <label className="form-label" htmlFor="isFavorite">Is Favorite</label>
                            <Controller
                                name="isFavorite"
                                control={control}
                                render={({ field }) => <Form.Check
                                    type="checkbox"
                                    label="Is Favorite"
                                    {...field}
                                    checked={field.value}
                                />}
                            />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary" type='submit'>Save</button>
                      {employeeId && <button className="btn btn-danger ms-auto" type='button' onClick={deleteEmployee}>Delete</button>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default AddEditEmployees
