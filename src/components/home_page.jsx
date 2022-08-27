import React, { Component } from 'react';
import Topbar from "./topbar";

function HomePage(props) {
    console.log(props)
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <h1>Home Page</h1>
            </div>
        </div>
    );
}

export default HomePage;