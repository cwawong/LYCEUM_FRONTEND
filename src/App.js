import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./App.css"

import HomePage from './components/HomePage'
import SearchPage from "./components/SearchPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoginPage from "./components/LogInPage";
import {AccountContext, APIContext, SearchContext} from "./contexts/Contexts";
import PersonalAccountPage from "./components/PersonalAccountPage";
import PostCreate from "./components/PostCreate";
import Root from "./components/Root";
import Topbar from "./components/Topbar";
import PostDetail from "./components/PostDetail";

class App extends React.Component {
    state = {
        topbarHeight: "10vh",
        logInStatus: "guest", //guest or member
        searchQuery: {
            query: null,
            type: null
        },
        account: "",
    }
    setAccount = (account) => this.setState({account: account});
    setLogInStatus = (status) => this.setState({logInStatus: status});
    setSearchQuery = (query) => this.setState({searchQuery: query})

    theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    getObject = async (objectName, id) => {
        let callID = id === "all" ? "" : id;
        let callName = id === "all" ? objectName.concat("s") : objectName;
        const response = await fetch(`http://127.0.0.1:8000/api/${callName}/${callID}`).catch((error) => "failed");
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            alert("API call failed. Please contact IT Team.")
            return "failed";
        }

    }

    postObject = async (objectName, json) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json),
        };
        const response = await fetch(`http://127.0.0.1:8000/api/${objectName}s/`, requestOptions).catch((error) => "failed");
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            alert("API call failed. Please contact IT T2eam.")
            return "failed";
        }
    }

    putObject = (objectName, id, json) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
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
            <div style={{backgroundColor: "#1A1A1A", height: "100vh",}}>
                <APIContext.Provider value={{
                    getObject: this.getObject,
                    postObject: this.postObject,
                    putObject: this.putObject,
                    deleteObject: this.deleteObject
                }}>
                    <AccountContext.Provider value={{
                        getAccount: this.state.account,
                        setAccount: this.setAccount,
                        setLogInStatus: this.setLogInStatus,
                        getLogInStatus: this.state.logInStatus
                    }}>
                        <SearchContext.Provider
                            value={{
                                getSearchQuery: this.state.searchQuery,
                                setSearchQuery: this.setSearchQuery
                            }}>
                            <ThemeProvider theme={this.theme}>
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/"
                                               element={<Root />}/>
                                        <Route path="/home"
                                               element={<HomePage topbarHeight={this.state.topbarHeight}/>}/>
                                        <Route path="/search"
                                               element={<SearchPage topbarHeight={this.state.topbarHeight}/>}/>
                                        <Route path="/login"
                                               element={<LoginPage topbarHeight={this.state.topbarHeight}/>}/>
                                        <Route path="/personal-account"
                                               element={<PersonalAccountPage topbarHeight={this.state.topbarHeight}/>}/>
                                        <Route path="/create"
                                               element={<PostCreate topbarHeight={this.state.topbarHeight}/>}/>
                                        <Route path="/detail/postID=:postID"
                                               element={<PostDetail topbarHeight={this.state.topbarHeight}/>} />
                                    </Routes>
                                </BrowserRouter>
                            </ThemeProvider>
                        </SearchContext.Provider>
                    </AccountContext.Provider>
                </APIContext.Provider>
            </div>
        )
    }
}

export default App;
