import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../constant/theme";
import { Tab, Nav, Modal } from "react-bootstrap";

const tableData = [
  {
    id: "1",
    image: IMAGES.contact1,
    name: "Luca Ferrari",
    location: "Italian",
    amount: "924,23",
    lastorder: "125",
  },
  {
    id: "2",
    image: IMAGES.contact2,
    name: "Anna Petrova",
    location: "Russian",
    amount: "854,71",
    lastorder: "985",
  },
  {
    id: "3",
    image: IMAGES.contact3,
    name: "Ahmed Hassan",
    location: "Egyptian",
    amount: "654,23",
    lastorder: "771",
  },
  {
    id: "4",
    image: IMAGES.contact9,
    name: "Ingrid Jensen",
    location: "Norwegian",
    amount: "478,25",
    lastorder: "258",
  },
  {
    id: "5",
    image: IMAGES.contact5,
    name: "Hiroshi Tanaka",
    location: "Japanese",
    amount: "745,38",
    lastorder: "368",
  },
  {
    id: "6",
    image: IMAGES.contact6,
    name: "Isabela Silva",
    location: "Portuguese",
    amount: "784,35",
    lastorder: "654",
  },
  {
    id: "7",
    image: IMAGES.contact7,
    name: "Karl Schmidt ",
    location: "German",
    amount: "987,54",
    lastorder: "741",
  },
  {
    id: "8",
    image: IMAGES.contact8,
    name: "Amara Desai",
    location: "Indian",
    amount: "365,41",
    lastorder: "368",
  },
  {
    id: "9",
    image: IMAGES.contact9,
    name: "Emilio Fernandez",
    location: "Mexican",
    amount: "126,45",
    lastorder: "154",
  },
  {
    id: "10",
    image: IMAGES.contact1,
    name: "Li Wei",
    location: "Chinese",
    amount: "874,45",
    lastorder: "753",
  },
  {
    id: "11",
    image: IMAGES.contact3,
    name: "Ahmed Hassan",
    location: "Egyptian",
    amount: "654,23",
    lastorder: "771",
  },
  {
    id: "12",
    image: IMAGES.contact9,
    name: "Ingrid Jensen",
    location: "Norwegian",
    amount: "478,25",
    lastorder: "258",
  },
  {
    id: "13",
    image: IMAGES.contact5,
    name: "Hiroshi Tanaka",
    location: "Japanese",
    amount: "745,38",
    lastorder: "368",
  },
  {
    id: "14",
    image: IMAGES.contact6,
    name: "Isabela Silva",
    location: "Portuguese",
    amount: "784,35",
    lastorder: "654",
  },
  {
    id: "15",
    image: IMAGES.contact7,
    name: "Karl Schmidt ",
    location: "German",
    amount: "987,54",
    lastorder: "741",
  },
  {
    id: "16",
    image: IMAGES.contact8,
    name: "Amara Desai",
    location: "Indian",
    amount: "365,41",
    lastorder: "368",
  },
];


const Customers = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#orderlist-table tbody tr")
  );
  const sort = 10;
  const activePage = useRef(0);
  const [test, setTest] = useState(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  useEffect(() => {
    setData(document.querySelectorAll("#orderlist-table tbody tr"));
  }, [test]);

  activePage.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePage.current = i;
    chageData(activePage.current * sort, (activePage.current + 1) * sort);
    setTest(i);
  };

  const checkboxFun = (type) => {
    setTimeout(() => {
      const checkbox = document.querySelectorAll(".sorting_25 input");
      const motherCheckBox = document.querySelector(".sorting_asc_15 input");
      for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if (type === "all") {
          if (motherCheckBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherCheckBox.checked = false;
            break;
          } else {
            motherCheckBox.checked = true;
          }
        }
      }
    }, 100);
  };

  // const [customModal, setCustomModal] = useState(false);
  return (
    <div className="container">
      <Tab.Container defaultActiveKey={"Active"}>
        <div className="row">
          <div className="col-xl-12">
            <Tab.Content>
              <Tab.Pane eventKey={"Active"}>
                <div className="card mt-2">
                  <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                      <div id="orderlist-table" className="dataTables_wrapper no-footer" >
                        <table id="empoloyees-tbl" className="table dataTable no-footer" >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Location</th>
                              <th>Department</th>
                              <th>Job Title</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((item, index) => (
                              <tr key={index}>
                                <td><span>#000123456</span></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img src={item.image} className="avatar avatar-xxs rounded" alt="Employee Image" />
                                    <p className="mb-0 ms-2">{item.name}</p>
                                  </div>
                                </td>
                                <td><span>Email</span></td>
                                <td><span>{item.location}</span></td>
                                <td>Department</td>
                                <td>Job Title</td>
                                <td>
                                 <button className="btn btn primary">View Employee</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                          <div className="dataTables_info">
                            Showing {activePage.current * sort + 1} to{" "}
                            {data.length > (activePage.current + 1) * sort ? (activePage.current + 1) * sort : data.length}{" "} of {data.length} entries
                          </div>
                          <div className="dataTables_paginate paging_simple_numbers justify-content-center" id="example2_paginate">
                            <Link className="paginate_button previous disabled" to="#" onClick={() => activePage.current > 0 && onClick(activePage.current - 1) }> Prev </Link>
                            <span>
                              {paggination.map((number, i) => (
                                <Link key={i} to="#" className={`paginate_button  ${ activePage.current === i ? "current" : "" } `} onClick={() => onClick(i)}> {number} </Link> 
                                ))}
                            </span>
                            <Link className="paginate_button next" to="#" onClick={() => activePage.current + 1 < paggination.length && onClick(activePage.current + 1) }>Next</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey={"Inactive"}>{/* <InactiveTab  */}</Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
      {/* <Modal show={customModal} onHide={setCustomModal} centered>
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title">Add Customer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setCustomModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control mb-3"
                id="exampleInputEmail1"
                placeholder="Name"
              />
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                id="exampleInputEmail2"
                placeholder=" Email"
              />
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control mb-3"
                id="exampleInputEmail3"
                placeholder="Location"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              onClick={() => setCustomModal(false)}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default Customers;
