import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./App.css"

import HomePage from './components/HomePage'
import View1 from './components/View1'
import View2 from './components/View2'
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./components/LogInPage";
import {AccountContext, APIContext} from "./contexts/Contexts";

class App extends React.Component {
  state = {
      topbarHeight: "10vh",
      //guest or member
      logInStatus: "guest",
      account: "",
  }
  setAccount = (account) => this.setState({account: account});
  setLogInStatus = (status) => this.setState({logInStatus: status});

  getObject = async (objectName, id) => {
      let callID = id === "all" ? "" : id;
      let callName = id === "all" ? objectName.concat("s") : objectName;
      const response = await fetch(`http://127.0.0.1:8000/api/${callName}/${callID}`);
      if(response.ok){
          const jsonResponse = await response.json();
          return jsonResponse;
      }else{
          alert("API call failed. Please contact IT Team.")
          return "failed";
      }

  }

  postObject = (objectName, json) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
      };
      fetch(`http://127.0.0.1:8000/api/${objectName}s/`, requestOptions)
          .then(response => response.json())
          .then(
              json => console.log(json),
              error => alert(error)
          );
  }

  putObject = (objectName, id, json) => {
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
      };
      fetch(`http://127.0.0.1:8000/api/${objectName}/${id}/`, requestOptions)
          .then(response => response.json())
          .then(
              json => console.log(json),
              error => alert(error)
          );
  }
  deleteObject = (objectName, id) => {
      const requestOptions = {
          method: 'PUT',
      };
      fetch(`http://127.0.0.1:8000/api/${objectName}/${id}/`, requestOptions)
          .then(response => response.json())
          .then(
              json => console.log(json),
              error => alert(error)
          );
  }

    render() {
        return (
            <div className="debug_border_red" style={{backgroundColor: "#202020", height: "100vh"}}>
            <APIContext.Provider value={{getObject: this.getObject, postObject: this.postObject, putObject: this.putObject, deleteObject: this.deleteObject}}>
                <AccountContext.Provider value={{getAccount: this.state.account, setAccount: this.setAccount, setLogInStatus: this.setLogInStatus, getLogInStatus: this.state.logInStatus}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/home" element={<HomePage topbarHeight={this.state.topbarHeight}/>}/>
                            <Route path="/view_1" element={<View1 topbarHeight={this.state.topbarHeight}/>}/>
                            <Route path="/view_2" element={<View2 topbarHeight={this.state.topbarHeight}/>}/>
                            <Route path="/login_page" element={<LoginPage topbarHeight={this.state.topbarHeight}/>}/>
                        </Routes>
                    </BrowserRouter>
                </AccountContext.Provider>
            </APIContext.Provider>
            </div>
        )
    }
}

export default App;
