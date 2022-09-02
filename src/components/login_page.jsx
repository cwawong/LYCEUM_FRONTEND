import React from 'react';
import Topbar from "./topbar";

function LoginPage(props) {
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <h1>Login Page</h1>
            </div>
        </div>
    );
}

export default LoginPage;