import React from 'react';
import {Route, Switch} from "react-router-dom";
import {ADMIN_ROUTE} from "@/utils/consts";
import Users from "./Users/Users";
import Products from "./Products/Products";
import ProfileEdit from "@pages/VendorPanel/components/Profile/ProfileEdit";
import StatisticsAnalytics from "@pages/AdminPanel/components/StatisticsAnalytics/StatisticsAnalytics";
import Payments from "@pages/AdminPanel/components/Payments/Payments";
import NewProduct from "@pages/VendorPanel/components/materialComponents/newProduct";
import Settings from "@pages/AdminPanel/components/Settings/Settings";
import Notifications from "@components/Notifications";


const AdminRouter = () => {

    return (
        <Switch>
            <Route path={ADMIN_ROUTE+'/statistics_analytics'} component={StatisticsAnalytics}/>
            <Route path={ADMIN_ROUTE+'/payments'} component={Payments}/>
            <Route path={ADMIN_ROUTE+'/users'} exact component={Users}/>
            <Route path={ADMIN_ROUTE+'/users/:user'} component={ProfileEdit}/>
            <Route path={ADMIN_ROUTE+'/products'} exact component={Products}/>
            <Route path={ADMIN_ROUTE+'/products/:id'} component={NewProduct}/>
            <Route path={ADMIN_ROUTE+'/notifications'} component={Notifications}/>
            <Route path={ADMIN_ROUTE+'/settings'} component={Settings}/>
        </Switch>
    );
};

export default AdminRouter;
