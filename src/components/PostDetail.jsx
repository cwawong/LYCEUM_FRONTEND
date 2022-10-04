import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import Topbar from "./Topbar";
import {Avatar, Button, Card, CardActions, CardContent, Chip, Divider, TextField} from "@mui/material";
import PostExtract from "./PostExtract";
import {blue} from "@mui/material/colors";

function PostDetail(props) {
    const navigate = useNavigate();

    const {postID} = useParams();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);
    const search = useContext(SearchContext);


    const [draftMode, setDraftMode] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");

    const [post, setPost] = useState();
    const [subPosts, setSubPosts] = useState([]);

    useEffect(() =>{
        refresh();
    }, [])

    const refresh = () => {
        const postResponse = async () => await API.getObject("post", postID.toString());
        postResponse().then(json => {
            if (json === "failed")
                return;
            console.log(json);
            setPost(json);
        });
        const subPostResponse = async () => await API.getObject("sub-post", postID.toString());
        subPostResponse().then(json => {
            if (json === "failed")
                return;
            console.log("subpost", json);
            setSubPosts(json);
        });
    }

    const handleReplyCreation = async event => {
        event.preventDefault();
        if(account.getLogInStatus === "guest"){
            alert("Reply function is only available for members.");
            return;
        }
        let json = {
            message: replyMessage,
            user: account.getAccount.id,
            main_post: postID,
        }
        let response = await API.postObject("sub-post", json);
        console.log(response);
        alert("Successful Reply!");
        setReplyMessage("");
        setDraftMode(false);
        refresh();
    }

    return (
        <div style={{backgroundColor: "#1A1A1A"}}>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div className="container" style={{paddingTop: props.topbarHeight, backgroundColor: "#1A1A1A", color: "#FFFFFF", height: "100%"}}>
                <Card style={{backgroundColor: "#333333", borderRadius: "20px", marginTop: "2vh"}}>
                    <CardContent style={{height: "70%"}}>
                        <h1>{post?.title}</h1>
                        <Divider style={{marginTop: "2%",marginBottom: "2%", color: "#FFFFFF"}} sx={{ bgcolor: "#FFFFFF"}}/>
                        <p>{post?.message}</p>
                    </CardContent>
                    <CardActions>
                        <div className="container">
                            <div className="row">
                                <div className="col-6 d-flex flex-wrap">
                                    {post?.tags.map((tag) => <Chip label={tag.name}
                                                                         style={{marginRight: "1%", marginTop: "1%"}}
                                                                         onClick={() => {
                                                                             search.setSearchQuery({
                                                                                 type: "tag",
                                                                                 query: tag.name
                                                                             });
                                                                             navigate("/search");
                                                                         }}/>)}
                                </div>
                            </div>
                            <div className="row" style={{width: "100%", alignItems: "center", justifyContent: "flex-end"}}>

                                <div className="col-8 d-flex" style={{justifyContent: "flex-end"}}>
                                    <Card style={{backgroundColor: "black", width: "50%", fontSize: "70%"}}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-8">
                                                    Posted
                                                    by <br/>{post?.user_info.name}<br/>on {post?.created === null ? "" : post?.created.substring(0, 10)}
                                                </div>
                                                <div className="col-4" style={{justifyContent: "center"}}>
                                                    <Avatar
                                                        sx={{bgcolor: blue[500]}}>{post?.user_info.name.substring(0, 1).toUpperCase()}</Avatar>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </CardActions>
                </Card>
                <div className="row d-flex" style={{justifyContent: "space-between", paddingTop: "2%"}}>
                    <h1 style={{width: "50%"}}>Replies:</h1>
                    <Button variant="outlined" style={{width: "10%"}} onClick={(event => setDraftMode(true))}>
                        <strong>Reply</strong>
                    </Button>
                </div>
                {draftMode &&
                    <form onSubmit={handleReplyCreation} className="d-flex" style={{justifyContent: "space-between", marginTop: "2%", height: "100%"}}>
                        <TextField required label="Message"
                                   style={{width: "75%",}} onChange={(event) => {setReplyMessage(event.target.value);}}/>
                        <Button variant="outlined" style={{width: "10%"}} onClick={(event => setDraftMode(false))}>Discard</Button>
                        <Button type="submit" variant="contained" style={{width: "10%"}}>Create</Button>
                    </form>
                }

                <div className="d-block" style={{border: "1px solid white", borderRadius: "20px", marginTop: "2%"}}>
                    {subPosts.length === 0 && <h1>No Replies yet.</h1>}
                    {subPosts.map((subPost, idx) =>
                        <React.Fragment>
                            <div className="row d-flex" style={{margin: "2%"}}>
                                <div className="col-3">
                                    <Card style={{backgroundColor: "#2f2f2f", width: "100%", fontSize: "70%"}}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-8">
                                                    Posted
                                                    by <br/>{subPost?.user_info?.name}<br/>on {subPost?.created === null ? "" : subPost?.created.substring(0, 10)}
                                                </div>
                                                <div className="col-4" style={{justifyContent: "center"}}>
                                                    <Avatar
                                                        sx={{bgcolor: blue[500]}}>{subPost?.user_info.name.substring(0, 1).toUpperCase()}</Avatar>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="col-9" style={{padding: "2%"}}>
                                    <p>{subPost.message}</p>
                                </div>
                            </div>
                            <Divider style={{margin: "2%", color: "#FFFFFF"}} sx={{ bgcolor: "#FFFFFF"}}/>
                        </React.Fragment>
                    )}
                </div>

            </div>
        </div>
    )
}
export default PostDetail;
