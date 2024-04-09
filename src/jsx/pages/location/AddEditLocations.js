import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { createAsyncLocation ,selectSingleLocation, fetchAsyncSingleLocation, updateAsyncLocation} from '../../../store/location/LocationSlice';

const AddEditLocations = () => {  
  const { id: locationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let locationDetails = useSelector(selectSingleLocation);
  const [locationName, setLocationName] = useState('');
  useEffect(() => {
    if (locationId) {
      dispatch(fetchAsyncSingleLocation({id:locationId}));
    }else{
      locationDetails={}
    }
  }, [locationId, dispatch]);

  useEffect(() => {
    if (locationDetails && locationDetails.name) {
      setLocationName(locationDetails.name);
    } else {
      setLocationName(''); // Ensures the input remains controlled
    }
  }, [locationDetails]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (locationName.trim() !== '') {
      // If isEditMode, dispatch an action to edit the Location
      // Otherwise, dispatch an action to create a new Location
      if (locationId) {
        // Dispatch your edit Location action here
        await dispatch(updateAsyncLocation({ id: locationId, name: locationName }));
      } else {
        //dispatch an action to create a new Location here
        dispatch(createAsyncLocation({ name: locationName }));
      }
      //Navigate to listing page
      navigate('/Locations');
    }
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-8">
            <div className="card profile-card card-bx m-b30">
              <div className="card-header">
                <h6 className="title">{locationId ? 'Edit Location' : 'Add New Location'}</h6>
              </div>
              <form className="profile-form" onSubmit={handleSave}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 m-b30">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
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

export default AddEditLocations;
