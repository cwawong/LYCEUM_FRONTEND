import React, {Component, useState} from 'react';
import useFetch from "react-fetch-hook"
import Topbar from "./topbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import View1 from "./view_1";
import View2 from "./view_2";
import LoginPage from "./login_page";



class HomePage extends React.Component {
    state = {
        'apiData': [],
    }
    showAPIPosts = () => {
        const response = fetch("http://127.0.0.1:8000/api/getPosts").then(response => response.json()).then(json => this.setState({'apiData': json}));

    }

    clearAPIPosts = () => {
        this.setState({'apiData': []})
    }
    render() {
        return (
            <div>
                <Topbar apiButtonOnclick={this.showAPIPosts} clearAPIButtonOnclick={this.clearAPIPosts} topbarHeight={this.props.topbarHeight}></Topbar>
                <div style={{paddingTop: this.props.topbarHeight}}>
                    {this.state.apiData.map(data => <pre key={data.id}>{JSON.stringify(data)}</pre>)}


                </div>
            </div>
        );
    }
}

export default HomePage;