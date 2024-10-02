import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import React, { useState , useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline } from 'react-detect-offline';

function App() {
  useEffect(() => {
    if(localStorage.getItem('userToken') != null)
    {
      saveUserData();
    }
  }, []);

  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    // console.log(decodedToken);
  }

  let routers = createHashRouter([
    {
      path: '/',
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        { index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'movies', element: <ProtectedRoute><Movies /></ProtectedRoute> },
        { path: 'people', element: <ProtectedRoute><People /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile userData={userData} /></ProtectedRoute> },
        { path: 'tv', element: <ProtectedRoute><Tv /></ProtectedRoute> },
        { path: 'itemdetails/:id/:media_type', element: <ProtectedRoute><ItemDetails /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <ErrorPage /> },
      ],
    },
  ]);

  return <>
  <Offline> <div className="offline">You are offline</div> </Offline>
  <RouterProvider router={routers} />
  </>;
}

export default App;
