import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AccountContext, APIContext} from "../contexts/Contexts";
import Sidebar from "react-side-bar";
import {Button, Drawer, IconButton, InputBase, List, ListItem, ListItemButton, TextField} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../static/images/logo.png'


function Topbar(props) {
    const navigate = useNavigate();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);

    const [objectName, setObjectName] = useState("");
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [id, setID] = useState("");
    const [debugMode, setDebugMode] = useState(false);
    const [APIResponse, setAPIResponse] = useState([]);
    const [sideBarContent, setSideBarContent] = useState([]);


    const APICaller = async () => {
        const response = await API.getObject(objectName, id);
        console.log(response);
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

                            <InputBase
                                sx={{ flex: 1 }}
                                placeholder="Search Your Questions Here!"
                                inputProps={{ 'aria-label': 'search google maps' }}

                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>

                            {account.getLogInStatus === "guest" &&
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/login_page")}>
                                    <strong>log in / Sign Up</strong>
                                </Button>
                            }
                            {account.getLogInStatus === "member" &&
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/login_page")}>
                                    <AccountBoxIcon/>
                                    <strong>{account.getAccount.name}</strong>
                                </Button>
                            }
                        </div>
                        <Drawer anchor="left" open={sideBarOpen} onClose={(event) => setSideBarOpen(false)}>
                            <Button variant="text" onClick={(event) => setSideBarOpen(false)}><CancelIcon/>cancel</Button>
                            <List>
                                {sideBarContent.map((content) =>
                                    <ListItem >
                                        <ListItemButton key={content.name}>{content.name}</ListItemButton>
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
