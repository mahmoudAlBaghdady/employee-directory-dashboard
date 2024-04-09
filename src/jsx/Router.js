import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Error404 from "./pages/Error404";
import EmployeeTable from "./pages/employee/EmployeeTable";
import AddEditDepartments from "./pages/department/AddEditDepartments";
import Departments from "./pages/department/Departments";
import AddEditLocations from "./pages/location/AddEditLocations";
import Locations from "./pages/location/Locations";
import AddEditEmployees from "./pages/employee/AddEditEmployees";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainLayout></MainLayout>
      </>
    ),
    errorElement: <Error404></Error404>,
    children: [
      { path: "/", element:  <EmployeeTable /> },
      { path: "add-edit-employee/:id?", element: <AddEditEmployees /> },
      { path: "add-edit-department/:id?", element: <AddEditDepartments/> },  
      { path: "departments", element: <Departments/> },
      { path: "add-edit-location/:id?", element: <AddEditLocations/> },  
      { path: "locations", element: <Locations/> },

    ],
  },
]);

export default Router;
