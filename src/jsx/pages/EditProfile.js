import React from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";

const options2 = [
  { value: "1", label: "Software Development" },
  { value: "2", label: "Quality Assurance" },
  { value: "3", label: "Product Management" },
  { value: "4", label: "Human Resources" },
  { value: "5", label: "Marketing" },
  { value: "6", label: "Sales" },
];
const options3 = [
  { value: "1", label: "Beirut" },
  { value: "2", label: "Tripoli" },
  { value: "3", label: "Sidon" },
  { value: "4", label: "Zahle" },
  { value: "5", label: "Baabda" },
  { value: "6", label: "Jounieh" },
];

const EditProfile = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-8">
            <div className="card profile-card card-bx m-b30">
              <div className="card-header">
                <h6 className="title">Add New Employee</h6>
              </div>
              <form className="profile-form">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Phone</label>
                      <input type="text" className="form-control" defaultValue="+96178871649" />
                    </div>
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Job Title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Image URL</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Department</label>
                      <Select options={options2} className="custom-react-select" defaultValue="Select Department" isSearchable={false} />
                    </div>
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Location</label> <br />
                      <Select options={options3} className="custom-react-select" defaultValue={options3[0]} isSearchable={false} />
                    </div>
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`default-checkbox`} className="mb-3">
                          <Form.Check type={type} id={`default-${type}`} label={`Is Favorite`} />
                        </div>
                      ))}
                    </Form>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
