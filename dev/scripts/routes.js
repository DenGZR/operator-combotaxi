import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Authorisation } from './utils/Authorisation.js'

import App from './route/App.js';
import LoginPage from './route/LoginPage.js';
import Orders from './route/Orders.js';
import Drivers from './route/Drivers.js';
import DriverDescription from './route/DriverDescription.js';
import OrderCreate from './route/OrderCreate.js';
import ActivityMap from './route/ActivityMap.js';
import HistoryOrder from './route/HistoryOrder.js';
import NotFound from './route/notFound.js';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const routes = (
    <Router history={appHistory}>
        <Route path='/' component={ App } >
            <IndexRoute component= { LoginPage }/>
              <Route path='/orders' component={ Orders } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/drivers' component={ Drivers } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/drivers/:driverId' component={ DriverDescription } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/order_create' component={ OrderCreate } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/activity_map' component={ ActivityMap } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/activity_map/:orderId' component={ ActivityMap } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/history_order' component={ HistoryOrder } onEnter={Authorisation.checkAuthorisation}/>
              <Route path='/login' component={ LoginPage }/>
              <Route path='/logout' component={ LoginPage } onEnter={Authorisation.getLogout}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </Router>
);

export default routes;
