import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from '../Admin/UserList';
import UserEdit from '../Admin/UserEdit';
import UserRead from '../Admin/UserRead';
import ProfileList from '../Admin/ProfileList';
import ProfileEdit from '../Admin/ProfileEdit';
import RoleCheck from './RoleCheckingFunction';
import PageNotFound from '../General/Component/PageNotFound/PageNotFound';


const AdminRoute = () => {
    return (
        <RoleCheck role="admin" >
            <Routes>
                <Route path='users' element={<UserList />} />
                <Route path='users/form/:id' element={<UserEdit />} />
                <Route path='users/read/:id' element={<UserRead />} />
                <Route path='roles' element={<ProfileList />} />
                <Route path='roles/form/:name' element={<ProfileEdit />} />
                <Route path='*' exact={true} element={<PageNotFound />} />
            </Routes>
        </RoleCheck>
    )
}

export default AdminRoute;