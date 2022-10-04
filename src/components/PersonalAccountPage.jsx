import React, {useState} from 'react';
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import Topbar from "./Topbar";
import {Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

function PersonalAccountPage(props) {
    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);
    const search = React.useContext(SearchContext);
    const [posts, setPosts] = useState([]);
    const drawerWidth = 240;
    return (
        <div style={{backgroundColor: "#1A1A1A",}}>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div className="container-fluid " style={{paddingTop: props.topbarHeight}}>
                <div className="row">
                    <div className="col-3 ">
                        <Drawer
                            sx={{
                                width:0,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: "20vw",
                                    boxSizing: 'border-box',
                                    marginTop: props.topbarHeight,
                                },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <List>
                                {['Personal Information'].map((text) => (
                                    <ListItem key={text} >
                                        <ListItemButton>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </div>
                    <div className="col-9 ">

                    </div>
                </div>

            </div>
        </div>
    );
}

export default PersonalAccountPage;
