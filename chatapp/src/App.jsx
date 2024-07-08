import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Auth from "./components/Auth";
import './index.css'
import MainPage from "./pages/MainPage";

const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <MainPage/>
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/dashboard",
      element:<Auth><Dashboard/></Auth>
    },
    {
      path: "/dashboard/:channelId",
      element: <Auth><Dashboard/></Auth>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App 