import React, { useEffect, useState } from "react";
import { BoxStyle } from "../../Components/Client/Client.styles";
import { InfoBubble } from "../../Components/InfoBubble/infoBubble";
import { Dashboard } from "../../Components/NavBarComponent/DashBoard/DashBoard";
import { subscribeNotifications } from "../../Soket/subscribeNotifications";
import { NotFound } from "../PageNotFound/NotFound";
import { currentRole, CURRENT_ID, IBasePageProps } from "./Home.types";

export const Home = (props: IBasePageProps): JSX.Element => {

    useEffect(() => {
        subscribeNotifications(CURRENT_ID);
    }, [])

    return (currentRole !== null ? <React.Fragment>
        <div style={BoxStyle}>
            <img alt="Not found" width={500} height={500} style={{ position: "relative", bottom: "100px", left: "500px" }} src="/static/images/Logo.svg"></img>
        </div>
        {/* <InfoBubble message={messageNotification} /> */}
        <Dashboard currentUser={props.currentUser} />
    </React.Fragment> : <NotFound />);
}

