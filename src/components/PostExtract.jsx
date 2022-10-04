import React, {useContext, useEffect} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import {blue, deepOrange} from "@mui/material/colors";

function PostExtract(props) {
    const navigate = useNavigate();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);
    const search = useContext(SearchContext);

    return (
        <Card style={{marginBottom: "5%"}}>
            <CardContent>
                <h1>{props.post?.title}</h1>
                <p>{props.post?.message}</p>
            </CardContent>
            <CardActions>
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex flex-wrap">
                            {props.post?.tags.map((tag) => <Chip label={tag.name}
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
                    <div className="row" style={{width: "100%", alignItems: "center"}}>
                        <div className="col"><Button size="small"
                                                     onClick={() => navigate(`/detail/postID=${props.post?.id}`)}>Learn
                            More</Button></div>
                        <div className="col d-flex" style={{justifyContent: "flex-end"}}>
                            <Card style={{backgroundColor: "black", width: "50%", fontSize: "70%"}}>
                                <CardContent>
                                    <div className="row">
                                        <div className="col-8">
                                            Posted
                                            by <br/>{props.post.user_info?.name}<br/>on {props.post?.created === null ? "" : props.post?.created.substring(0, 10)}
                                        </div>
                                        <div className="col-4" style={{justifyContent: "center"}}>
                                            <Avatar
                                                sx={{bgcolor: blue[500]}}>{props.post.user_info?.name.substring(0, 1).toUpperCase()}</Avatar>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardActions>
        </Card>
    );
}

export default PostExtract;
