import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './Home';
import Post from './components/Post/Post';
import UserProfile from './components/UserProfile/UserProfile';
import Friends from './components/Friends/Friends';
import History from './components/History/History';
import Setting from './components/Setting/Setting';
import Market from './components/Market/Market';
import Course from './components/Course/Course';

/*const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/post",
    element: <Post/>,
  },
  {
    path: "/userprofile",
    element: <UserProfile/>,
  },
  {
    path: "/friends",
    element: <Friends/>,
  },
  {
    path: "/history",
    element: <History/>,
  },
  {
    path: "/setting",
    element: <Setting/>,
  },
  {
    path: "/market",
    element: <Market/>,
  },
  {
    path: "/course",
    element: <Course/>,
  },
]);
*/

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
/*
class App extends Component {
  render() {
    return (
      <RouterProvider router={router} />
    );
  }
}*/

export default App;