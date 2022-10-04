import React, {useEffect, useState} from 'react';
import Topbar from "./Topbar";
import {AccountContext, APIContext} from "../contexts/Contexts";
import PostExtract from "./PostExtract";
import {Button, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";
function HomePage(props) {
    const navigate = useNavigate();

    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const response = async () => await API.getObject("post", "all");
        response().then(json => {
            if (json === "failed")
                return;
            console.log(json);
            setPosts(json);
        });
    }, [])
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight, backgroundColor: "#1A1A1A"}}>
                <div className="container d-block" style={{marginTop: "1%"}}>
                    {account.getLogInStatus === "member" &&
                        <div className="row" style={{justifyContent: "center"}}>
                            <Button variant="contained"
                                    style={{fontSize: "100%", color: "#FFFFFF", width: "100%", marginBottom: "5%"}}
                                    onClick={(event) => navigate("/create")}>
                                <strong>Post a question</strong>
                            </Button>
                        </div>
                    }
                    <h1 style={{marginBottom: "5%", color: "white", fontFamily: "ariel"}}>Top Picks For You:</h1>
                    {posts.map((post) => <div className="row"><PostExtract key={post.id} post={post}/><Divider style={{marginBottom: "5%"}}/></div>)}

                </div>
            </div>
        </div>
    );

}

export default HomePage;
