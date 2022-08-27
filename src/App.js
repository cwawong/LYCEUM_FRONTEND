import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./App.css"

import HomePage from './components/home_page'
import View1 from './components/view_1'
import View2 from './components/view_2'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as url from "url";
import LoginPage from "./components/login_page";

class App extends React.Component {
  state = {
    topbarHeight: "100px",
  }
  render() {
    return (
        <div>
          <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage topbarHeight={this.state.topbarHeight}/>}/>
                <Route path="/view_1" element={<View1 topbarHeight={this.state.topbarHeight}/>}/>
                <Route path="/view_2" element={<View2 topbarHeight={this.state.topbarHeight}/>}/>
                <Route path="/login_page" element={<LoginPage topbarHeight={this.state.topbarHeight}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    )
  }
}

export default App;