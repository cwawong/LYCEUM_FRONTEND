import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import Sidebar from "react-side-bar";
import {
    Button,
    Drawer,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../static/images/logo.png'


function Topbar(props) {
    const navigate = useNavigate();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);
    const search = useContext(SearchContext);

    const [objectName, setObjectName] = useState("");
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [id, setID] = useState("");
    const [debugMode, setDebugMode] = useState(false);
    const [APIResponse, setAPIResponse] = useState([]);
    const [sideBarContent, setSideBarContent] = useState([]);
    const [query, setQuery] = useState("");


    const APICaller = async () => {
        const response = await API.getObject(objectName, id);
        if (typeof response.length === "undefined" || typeof response === "string") {
            setAPIResponse([response]);
        } else {
            setAPIResponse(response);
        }
    }

    const sideBarHandler = async (open, type) => {
        if (type === "subjects"){
            let tags = await API.getObject("tag", "all");
            let subjects = tags.filter(tag => tag.is_subject);
            setSideBarContent(subjects);
        }
        setSideBarOpen(open);
    }

    const handleSearchQuery = (query, type) => event => {
        event.preventDefault();
        if (!["tag", "message"].includes(type)){
            alert("Invalid Search Type.")
            return;
        }
        search.setSearchQuery({query: query, type: type});

        navigate("/search");
    }

    return (
        <div>
            <header>
                <div className="container-fluid position-fixed">
                    <div className="row" style={{background: "black", height: props.topbarHeight}}>
                        <div className="col d-flex p-0" style={{height: "100%", }}>
                            <Button variant="text"
                                    style={{color: "#FFFFFF", height: "100%"}} onClick={() => navigate("/home")}>
                                <img style={{maxHeight: "100%", width: "auto"}}
                                     src={logo}
                                     alt="No Image Loaded"/>
                            </Button>

                            <Button variant="text"
                                    style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={(event) => sideBarHandler(true, "subjects")}>
                                <strong>subjects</strong>
                            </Button>

                            <form onSubmit={handleSearchQuery(query, "message")} style={{display: 'flex', alignItems: 'center', width: "80%"}}>
                                <InputBase
                                    sx={{flex: 1}}
                                    style={{width: "90%"}}
                                    placeholder="Search Your Questions Here!"
                                    inputProps={{'aria-label': 'search google maps'}}
                                    onChange={event => setQuery(event.target.value)}
                                />
                                <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={handleSearchQuery(query, "message")}>
                                    <SearchIcon/>
                                </IconButton>
                            </form>

                            {account.getLogInStatus === "guest" &&
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/login")}>
                                    <strong>log in / Sign Up</strong>
                                </Button>
                            }
                            {account.getLogInStatus === "member" &&
                                // <Button variant="text"
                                //         style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/personal-account")}>
                                //     <AccountBoxIcon/>
                                //     <strong>{account.getAccount.name}</strong>
                                // </Button>
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}}>
                                    <AccountBoxIcon/>
                                    <strong>{account.getAccount.name}</strong>
                                </Button>
                            }
                        </div>
                        <Drawer anchor="left" open={sideBarOpen} onClose={(event) => setSideBarOpen(false)}>
                            <Button variant="text" onClick={(event) => setSideBarOpen(false)}><CancelIcon/>cancel</Button>
                            <List>
                                {sideBarContent.map((tag) =>
                                    <ListItem >
                                        <ListItemButton onClick={(event) => {setSideBarOpen(false); search.setSearchQuery({type: "tag", query: tag.name}); navigate("/search");}}>{tag.name}</ListItemButton>
                                    </ListItem>)}
                            </List>
                        </Drawer>
                    </div>
                </div>
            </header>
            {
                debugMode &&
                <div className="container position-fixed"
                     style={{width: "20%", height: "100%", right: "0px", background: "lightgrey"}}>
                    <div className="row debug_border_green">
                        <h2>DEBUGGING CONSOLE</h2>
                        {APIResponse.map(response => <li>{JSON.stringify(response)}</li>)}
                    </div>
                </div>
            }
        </div>
    );
}

export default Topbar;
