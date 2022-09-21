import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AccountContext, APIContext} from "../contexts/Contexts";
import Sidebar from "react-side-bar";
import {Button, Drawer, List, ListItem, ListItemButton} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CancelIcon from '@mui/icons-material/Cancel';

function Topbar(props) {
    const navigate = useNavigate();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);

    const [objectName, setObjectName] = useState("");
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [id, setID] = useState("");
    const [debugMode, setDebugMode] = useState(false);
    const [APIResponse, setAPIResponse] = useState([]);


    const APICaller = async () => {
        const response = await API.getObject(objectName, id);
        console.log(response);
        if (typeof response.length === "undefined" || typeof response === "string") {
            setAPIResponse([response]);
        } else {
            setAPIResponse(response);
        }
    }

    return (
        <div>
            <header>
                <div className="container-fluid position-fixed">
                    <div className="row" style={{background: "black", height: props.topbarHeight}}>
                        <div className="col-6 d-flex p-0" style={{height: "100%", alignItems: "center",}}>
                            <Button variant="text"
                                    style={{color: "#FFFFFF", height: "100%"}} onClick={() => navigate("/home")}>
                                <img style={{maxHeight: "100%", width: "auto"}}
                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnDz08lUWsDll_7m1NYkHV_U2gNmfvTWCGg&usqp=CAU"
                                     alt="No Image Loaded"/>
                            </Button>

                            <Button variant="text"
                                    style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => setSideBarOpen(true)}>
                                <strong>subjects</strong>
                            </Button>
                        </div>
                        <div className="col-6 d-flex p-0" style={{justifyContent: "flex-end", height: "100%",  }}>
                            {/*<div className="d-none d-xl-flex">*/}
                            {/*    <button className="btn btn-primary m-1" onClick={APICaller}>*/}
                            {/*        Call API(<strong>GET ONLY</strong>)*/}
                            {/*    </button>*/}
                            {/*    <button className="btn btn-primary m-1" onClick={(event) => setDebugMode(!debugMode)}>*/}
                            {/*        Show Debugging Page*/}
                            {/*    </button>*/}
                            {/*    <input style={{width: "10vw"}} placeholder="Object Name"*/}
                            {/*           onChange={(event) => setObjectName(event.target.value)}/>*/}
                            {/*    <input style={{width: "10vw"}} placeholder="ID"*/}
                            {/*           onChange={(event) => setID(event.target.value)}/>*/}
                            {/*</div>*/}
                            {account.getLogInStatus === "guest" &&
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/login_page")}>
                                    <strong>log in/ Sign Up</strong>
                                </Button>
                            }
                            {account.getLogInStatus === "member" &&
                                <Button variant="text"
                                        style={{color: "#FFFFFF", fontSize: "100%", width: "20%",}} onClick={() => navigate("/login_page")}>
                                    <AccountBoxIcon/>
                                    <strong>{account.getAccount.name}</strong>
                                </Button>
                            }
                            <Drawer anchor="left" open={sideBarOpen} onClose={(event) => setSideBarOpen(false)}>
                                <Button variant="text" onClick={(event) => setSideBarOpen(false)}><CancelIcon/>cancel</Button>
                                <List>
                                    {["RECENT", "TREND", "REPLIES"].map((value) =>
                                        <ListItem >
                                            <ListItemButton>{value}</ListItemButton>
                                        </ListItem>)}
                                </List>
                            </Drawer>
                        </div>

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
