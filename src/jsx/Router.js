import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EditProfile from "./pages/EditProfile";
import Error404 from "./pages/Error404";
import EmployeeTable from "./pages/EmployeeTable";

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
      { path: "edit-profile", element: <EditProfile /> },
      { path: "employee", element: <EmployeeTable /> },
    ],
  },
]);

export default Router;
