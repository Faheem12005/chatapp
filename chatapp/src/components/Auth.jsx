import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUsername,resetUsername } from "../features/user/userSlice";

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post('/api/auth');
        if (response.status === 200) {
          setIsAuthenticated(true);
          dispatch(setUsername(response.data.user.username));
        } else {
          setIsAuthenticated(false);
          dispatch(resetUsername());
        }
      } catch (error) {
        console.log('Authentication check failed:', error);
        setIsAuthenticated(false);
        dispatch(resetUsername());
      }
    };

    checkAuth(); 
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default Auth;
