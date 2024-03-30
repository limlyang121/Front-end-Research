import React from 'react';
import './App.css';
import Home from './Home';
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from "./General/Login"
import LandingPage from './LandingPage';
import ProfileUpdate from './General/ProfileUpdate';
import PageNotFound from './General/Component/PageNotFound/PageNotFound';
import AccessDenied from './General/Component/AccessDenied/AccessDenied';
import Footer from './Navbar/Footer';
import AppNavbar from './Navbar/AppNavbar';
import AdminRoute from './Route/AdminRoute';
import ReviewerRoute from './Route/ReviewerRoute';
import AuthorRoute from './Route/AuthorRoute';
import ConferenceRoute from './Route/ConferenceRoute';


const App = () => {
  return (
    <div>
      <ErrorBoundary >
        <Router>
          <AppNavbar />

          <Routes>

            <Route exact path="/" element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            {/* General */}
            <Route path='/profile' exact={true} element={<ProfileUpdate />} />

            {/* System Role */}
            <Route path='/admin/*' element={<AdminRoute />} />
            <Route path='/author/*' element={<AuthorRoute />} />
            <Route path='/reviewer/*' element={<ReviewerRoute />} />
            <Route path='/conference/*' element={<ConferenceRoute />} />

            {/* Login */}
            <Route path='/home' exact={true} element={<Home />} />


            {/* Access Denied */}
            <Route path='/denied' exact={true} element={<AccessDenied />} />


            {/* Page not found */}
            <Route path='/*' exact={true} element={<PageNotFound />} />


          </Routes>

          <Footer />
        </Router>
      </ErrorBoundary>

    </div>

  )
}
export default App;