import React from 'react';
import './App.css';
import Home from './Home';
import ErrorBoundary  from "./ErrorBoundary";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './Admin/UserList';
import UserEdit from './Admin/UserEdit';
import UserRead from './Admin/UserRead';
import RoleList from "./Admin/ProfileList"
import RoleEdit from "./Admin/ProfileEdit"


import Login from "./General/Login"
import LandingPage from './LandingPage';
import PaperEdit from "./Author/PaperEdit"
import PaperList from './Author/PaperList';
import PaperRead from './Author/PaperRead';
import ReviewerBid from './Reviewer/ReviewerBid';
import ReviewerBidStatus from './Reviewer/ReviewerBidStatus';
import AccessDenied from './Security/Access-Denied';
import ConferenceReviewerBid from './ConferenceChair/ConferenceReviewerBid';
import ReviewerReview from './Reviewer/ReviewerReviewList';
import ReviewerReviewForm from './Reviewer/ReviewerReviewForm';
import PaperReview from './Author/PaperReview';
import ConferencePaperList from './ConferenceChair/ConferencePaperList';
import ConferenceCheckReviewerBidProcess from './ConferenceChair/ConferenceCheckReviewerBidProcess';
import ConferenceAllReviewerReviews from './ConferenceChair/ConferenceAllReviewerReviews';
import GoogleDriveUpload from './Author/Test/GoogleDriveUpload';
import PaperPublishList from './Author/PaperPublishList';
import ProfileUpdate from './General/ProfileUpdate';


const App = () => {
  return (
    <div>
      <ErrorBoundary >
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            {/* Login */}
            <Route path='/home' exact={true} element={<Home />} />
            
            {/* General */}
            <Route path='/profile' exact={true} element={<ProfileUpdate />} />


            {/* Admin */}
            <Route path='/admin/users' exact={true} element={<UserList />} />
            <Route path='/admin/users/form/:id' element={<UserEdit />} />
            <Route path='/admin/users/read/:id' element={<UserRead />} />
            <Route path='/admin/roles' element={<RoleList />} />
            <Route path='/admin/roles/form/:name' element={<RoleEdit />} />



            {/* Auhor */}
            <Route path='/author/papers' exact={true} element={<PaperList />} />
            <Route path='/author/papers/form/:id' exact={true} element={<PaperEdit />} />
            <Route path='/author/papers/read/:id' exact={true} element={<PaperRead />} />
            <Route path='/author/papers/:id/review' exact={true} element={<PaperReview />} />
            <Route path='/author/papers/publish' exact={true} element={<PaperPublishList />} />
            <Route path='/author/test' exact={true} element={<GoogleDriveUpload />} />


            {/* Reviewer */}
            <Route path='/reviewer/bid/' exact={true} element={<ReviewerBid />} />
            <Route path='/reviewer/mybids' exact={true} element={<ReviewerBidStatus />} />
            <Route path='/reviewer/reviews' exact={true} element={<ReviewerReview />} />
            <Route path='/reviewer/review/:id/:status' exact={true} element={<ReviewerReviewForm />} />


            {/* Conference Chaiar */}
            <Route path='/conference/bids' exact={true} element={<ConferenceReviewerBid />} />
            <Route path='/conference/papers/ready' exact={true} element={<ConferencePaperList />} />
            <Route path='/conference/papers/:id/reviews/:status' exact={true} element={<ConferenceAllReviewerReviews />} />
            <Route path='/conference/papers/:id/bids' exact={true} element={<ConferenceCheckReviewerBidProcess />} />



            {/* Access Denied */}
            <Route path='/denied' exact={true} element={<AccessDenied />} />



          </Routes>
        </Router>
      </ErrorBoundary>

    </div>

  )
}
export default App;