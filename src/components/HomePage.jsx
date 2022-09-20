import React, {useState} from 'react';
import Topbar from "./Topbar";
import {AccountContext} from "../contexts/Contexts";

function HomePage(props) {
    const account = React.useContext(AccountContext);

    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>

            </div>
        </div>
    );

}

export default HomePage;