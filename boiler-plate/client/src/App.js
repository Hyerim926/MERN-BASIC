import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Landingpage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={ <Landingpage /> } />
          <Route exact path="/login" element={ <LoginPage /> } />
          <Route exact path="/register" element={ <RegisterPage /> } />
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


export default App;
