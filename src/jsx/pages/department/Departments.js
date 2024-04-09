import React ,{ useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDepartments, selectAllDepartment} from "../../../store/department/DepartmentSlice";
import { SVGICON } from "../../constant/theme";

const Departments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncDepartments());
  }, [dispatch]);
  const departments = useSelector(selectAllDepartment);
 
  console.log("departments",departments)
    
  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-12 mb-5'>
                    <Link className='btn btn-success fs-4 mx-md-2 mx-auto' to={'/add-edit-department'}>Add New Department</Link>
                </div>
            </div>
            <div className='row justify-content-center'>
                {departments?.map((item)=>{
                    return(
                        <div className='col-md-5 col-12 border bg-success rounded my-3 mx-2' key={item.id}>
                            <p className='fs-4 my-auto mx-auto px-3 py-2 text-white d-inline-block'>{item.name}</p>
                            <Link className="btn btn-outline-success p-2 float-end bg-white" to={"/add-edit-department/"+item.id}>{SVGICON.Edit}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Departments