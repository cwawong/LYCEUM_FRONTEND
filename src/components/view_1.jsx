import React, { Component } from 'react';
import Topbar from "./topbar";
function View1(props) {
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <h1>view_1</h1>
            </div>
        </div>
    );
}

export default View1;