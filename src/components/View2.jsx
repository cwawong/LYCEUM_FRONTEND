import React, { Component } from 'react';
import Topbar from "./Topbar";

function View2(props) {
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <h1>view_2</h1>
            </div>
        </div>
    );
}

export default View2;