import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../constant/theme";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncEmployees, searchEmployeesAsync, selectAllEmployees, selectSearchResults } from "../../store/employee/EmployeeSlice";

// tableData
const Customers = () => {

  const dispatch = useDispatch();
  const employeesObject = useSelector(selectAllEmployees);
  const searchResults = useSelector(selectSearchResults);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { employees, totalPage } = employeesObject || { employees: [], totalPage: 0 }; 

  const handleSearch = (e) => {
    e.preventDefault(); 
    setCurrentPage(1); 
    if (searchQuery.trim()) {
      dispatch(searchEmployeesAsync({ query: searchQuery.trim(), page: currentPage, limit: itemsPerPage }));
    } else {
      dispatch(fetchAsyncEmployees({ page: currentPage, limit: itemsPerPage }));
    }
  };
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchEmployeesAsync({ query: searchQuery.trim(), page: currentPage, limit: itemsPerPage }));
    } else {
      dispatch(fetchAsyncEmployees({ page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, currentPage, itemsPerPage, searchQuery]);


  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const employeesToDisplay = searchQuery.trim() ? searchResults : employees;
  return (
    <div className="container">
      <div className="row justify-content-between mb-3">
        <div className="col-6 my-auto">
          <form className="d-flex my-auto" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div className="col-4  my-auto">
          <Link to={"/add-employee"} className="btn btn-lg btn-success float-end">Add New Employee</Link>
        </div>
      </div> 
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-2">
            <div className="card-body p-0">
              <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                <div id="orderlist-table" className="dataTables_wrapper no-footer" >
                  <table id="empoloyees-tbl" className="table dataTable no-footer" >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesToDisplay?.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={item.pictureUrl} className="avatar avatar-xxs rounded" alt="Employee Image" />
                              <p className="mb-0 ms-2">{item.name}</p>
                            </div>
                          </td>
                          <td><span>{item.email}</span></td>
                          <td><span>{item.location.name}</span></td>
                          <td>{item.department.name}</td>
                          <td>{item.jobTitle}</td>
                          <td>
                            <Link className="btn btn-outline-success p-2 me-1" to={"/edit-employee/"+item.id}>{SVGICON.Edit}</Link>
                            {item.isFavorite?<button className="btn btn-warning py-2 px-3">{SVGICON.StarWhite}</button>:<button className="btn btn-outline-warning py-2 px-3">{SVGICON.StarYellow}</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="dataTables_paginate paging_simple_numbers justify-content-center" id="example_paginate">
                    <button className="paginate_button previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Prev</button>
                    <span>
                      {[...Array(totalPage).keys()].map((number) => {
                        return (
                          <button key={number} className={`paginate_button ${currentPage === number ? "current" : ""}`} onClick={() => handleChangePage(number)}>{number + 1}</button>
                        );
                      })}
                    </span>
                    <button className="paginate_button next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage + 1 >= totalPage}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
