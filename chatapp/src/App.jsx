import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Auth from "./components/Auth";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/dashboard",
      element:<Auth><Dashboard/></Auth>
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App 