import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Profile from '../pages/Profile';

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/'
                exact
                component={Home}
            />
            <Route
                path='/auth/login'
                exact
                component={Login}
            />
            <Route
                path='/auth/register'
                exact
                component={Register}
            />
            <Route
                path='/profile'
                exact
                component={Profile}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            {/* <Route
                path='*'
                component={Login}
            /> */}
        </Switch>
    );
}

export default Routes;
