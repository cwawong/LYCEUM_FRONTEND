import React, {useEffect, useState} from 'react';
import Topbar from "./Topbar";
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import PostExtract from "./PostExtract";
import {Divider} from "@mui/material";

function SearchPage(props) {
    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);
    const search = React.useContext(SearchContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const response = async () => await API.getObject("post", "all");
        response().then(json => {
            if (json === "failed")
                return;
            let filteredPosts = [];
            if(search.getSearchQuery.type === "tag"){
                json.forEach((post) => {
                    let tags = []
                    post.tags?.forEach((tag) => tags.push(tag.name))
                    if(tags.includes(search.getSearchQuery.query))
                        filteredPosts.push(post);
                })
            }
            if(search.getSearchQuery.type === "message"){
                json.forEach((post) => {
                  if(post.message.toLowerCase().includes(search.getSearchQuery.query.toLowerCase()))
                      filteredPosts.push(post);
                })
            }
            setPosts(filteredPosts);
        });
    }, [search.getSearchQuery])

    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight, backgroundColor: "#1A1A1A"}}>
                <div className="container" style={{marginTop: "1%"}}>
                    <h1 style={{marginBottom: "5%", color: "white", fontFamily: "ariel"}}>Showing results of "{search.getSearchQuery.query}":</h1>
                    {posts.length === 0 ? <h2 style={{color: "white", marginBottom: "5%",}}>Sorry, no records related to "<i>{search.getSearchQuery.query}</i>" are found.</h2>: <h2 style={{color: "white", marginBottom: "5%",}}>{posts.length} records are found.</h2>}
                    {posts.map((post) => <React.Fragment><PostExtract key={post.id} post={post}/><Divider/></React.Fragment>)}

                </div>
            </div>
        </div>
    );
}

export default SearchPage;
