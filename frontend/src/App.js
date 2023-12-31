import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MostPopular from './pages/MostPopular';
import YourSaved from './pages/YourSaved';
import MostRecent from './pages/MostRecent';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/actions/userActions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/user/get-user-info`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('user')}`
          }
        });
        if (response.data.success) {
          const userInfo = {
            userId: response.data.data._id,
            likedArticles: response.data.data.likedArticles,
            savedArticles: response.data.data.savedArticles
          };
          // Assuming you have a Redux action to set user information
          dispatch(setUserInfo(userInfo));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // Only attempt to fetch user info if there's a token in local storage
    if (localStorage.getItem('user')) {
      fetchUserInfo();
    }
  }, [dispatch]);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mostpopular" element={<MostPopular />} />
        <Route path="/yoursaved" element={<YourSaved />} />
        <Route path="/mostrecent" element={<MostRecent />} />
      </Routes>
    </Router>
  );
}

export default App;