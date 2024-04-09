import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SVGICON } from "../../constant/theme";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncEmployees, selectAllEmployees} from "../../../store/employee/EmployeeSlice";

const Customers = () => {

  const dispatch = useDispatch();
  const employeesObject = useSelector(selectAllEmployees);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { employees, totalPage } = employeesObject || { employees: [], totalPage: 0 }; 

  useEffect(() => {
    dispatch(fetchAsyncEmployees({ search: search.trim(), page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    e.preventDefault(); 
    dispatch(fetchAsyncEmployees({ search: search.trim(), page: 0, limit: itemsPerPage }));
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearchChange=(e)=>{
    e.preventDefault();
    if(e.target.value === ''){
      setCurrentPage(1)
      setSearch('');
    }else{
      setSearch(e.target.value);
    }
  }
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
              value={search}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div className="col-4  my-auto">
          <Link to={"/add-edit-employee"} className="btn btn-lg btn-success float-end">Add New Employee</Link>
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
                      {employees?.map((item, index) => (
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
                            <Link className="btn btn-outline-success p-2 me-1" to={"/add-edit-employee/"+item.id}>{SVGICON.Edit}</Link>
                            {item.isFavorite?<i className="btn btn-warning py-2 px-3">{SVGICON.StarWhite}</i>:<i className="btn btn-outline-warning py-2 px-3">{SVGICON.StarYellow}</i>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="dataTables_paginate paging_simple_numbers justify-content-center" id="example_paginate">
                    <button className="paginate_button previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    <span>
                      {[...Array(totalPage).keys()].map((number) => {
                        return (
                          <button key={number} className={`paginate_button ${currentPage === number+1 ? "current" : ""}`} onClick={() => handleChangePage(number+1)}>{number + 1}</button>
                        );
                      })}
                    </span>
                    <button className="paginate_button next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPage}>Next</button>
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
