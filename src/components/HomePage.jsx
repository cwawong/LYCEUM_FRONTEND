import React, {useEffect, useState} from 'react';
import Topbar from "./Topbar";
import {AccountContext, APIContext} from "../contexts/Contexts";
import PostExtract from "./PostExtract";
import {Divider} from "@mui/material";
function HomePage(props) {
    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);

    const [posts, setPosts] = useState([{
        id: 2,
        title: null,
        message: null,
        updated: null,
        created: null,
        tags: []
    }]);
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
                <div className="container" style={{marginTop: "1%"}}>
                    <h1 style={{marginLeft: "5%", color: "white"}}>Top Picks For You:</h1>
                    {posts.map((post) => <React.Fragment><PostExtract key={post.id} post={post}/><Divider/></React.Fragment>)}

                </div>
            </div>
        </div>
    );

}

export default HomePage;
