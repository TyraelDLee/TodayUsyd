import React, { Component } from 'react';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Market from "./components/Market/Market";
import Course from "./components/Course/Course";
import UserProfile from "./components/UserProfile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/market",
    element: <Market/>,
  },
  {
    path: "/course",
    element: <Course/>,
  },
  {
    path: "/userProfile",
    element: <UserProfile/>,
  },
]);

class App extends Component {
  render() {
    return (
      <RouterProvider router={router} />
    );
  }
}

export default App;
