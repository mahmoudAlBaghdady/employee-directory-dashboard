import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { createAsyncDepartment ,selectSingleDepartment, fetchAsyncSingleDepartment, updateAsyncDepartment} from '../../../store/department/DepartmentSlice';

const AddEditDepartments = () => {  
  const { id: departmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let departmentDetails = useSelector(selectSingleDepartment);
  const [departmentName, setDepartmentName] = useState('');
  useEffect(() => {
    if (departmentId) {
      dispatch(fetchAsyncSingleDepartment({id:departmentId}));
    }else{
      departmentDetails={};
      setDepartmentName('');
    }
  }, [departmentId, dispatch]);

  useEffect(() => {
    if (departmentDetails && departmentDetails.name) {
      setDepartmentName(departmentDetails.name);
    } else {
      setDepartmentName(''); // Ensures the input remains controlled
    }
  }, [departmentDetails]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (departmentName.trim() !== '') {
      if (departmentId) {
        await dispatch(updateAsyncDepartment({ id: departmentId, name: departmentName }));
      } else {
        dispatch(createAsyncDepartment({ name: departmentName }));
      }
      setDepartmentName('');
      navigate('/departments');
    }
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-8">
            <div className="card profile-card card-bx m-b30">
              <div className="card-header">
                <h6 className="title">{departmentId ? 'Edit Department' : 'Add New Department'}</h6>
              </div>
              <form className="profile-form" onSubmit={handleSave}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary" type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditDepartments;
