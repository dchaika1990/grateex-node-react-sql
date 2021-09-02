import React from 'react';
import {VENDOR_PANEL} from "@/utils/consts";
import {Route, Switch} from "react-router-dom";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import Materials from "./Materials";
import Earnings from "./Earnings/Earnings";
import Notifications from "@components/Notifications";
import Support from "@pages/VendorPanel/components/Support/Support";
import PrivacyInfringement from "@pages/VendorPanel/components/Support/PrivacyInfringement";
import CopyrightInfringement from "@pages/VendorPanel/components/Support/CopyrightInfringement";

const VendorRouter = () => {
    return (
        <Switch>
            <Route path={VENDOR_PANEL+'/profile'} component={Profile}/>
            <Route path={VENDOR_PANEL+'/materials'} component={Materials} />
            <Route path={VENDOR_PANEL+'/earnings'} component={Earnings} />
            <Route path={VENDOR_PANEL+'/messages'} component={Notifications} />
            <Route path={VENDOR_PANEL+'/support'} exact component={Support} />
            <Route path={VENDOR_PANEL+'/support/copyright-infringement'} component={CopyrightInfringement} />
            <Route path={VENDOR_PANEL+'/support/privacy-infringement'} component={PrivacyInfringement} />
            <Route path={VENDOR_PANEL+'/settings'} component={Settings} />
        </Switch>
    );
};

export default VendorRouter;
