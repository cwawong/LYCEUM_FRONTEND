import React, {useEffect} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography} from "@mui/material";

function PostExtract(props) {
    useEffect(() => {
        try {
            if (props.post.message)
                console.log(props.post.message);
        } catch (error) {
            console.log("fucked", props)
            return;
        }
    }, [props.post])

    const getDateSubString = (time) => time === null? "" : time.substring(0,10);
    return (
        <Card style={{margin: "5%"}}>
            <CardContent>
                <h1>{props.post?.title}</h1>
                <p>{props.post?.message}</p>
            </CardContent>
            <CardActions>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {props.post?.tags.map((tag) => <Chip label={tag} style={{marginRight: "1%"}}/>)}
                    </div>
                </div>
                <div className="row" style={{width: "100%", alignItems: "center"}}>
                    <div className="col"><Button size="small">Learn More</Button></div>
                    <div className="col d-flex" style={{justifyContent: "flex-end"}}>
                        <Card style={{backgroundColor: "black", width: "50%", fontSize: "70%"}}>
                            <CardContent>
                                <div className="row">
                                    <div className="col-8">
                                        Posted by <br/>{props.post.user_info?.name}<br/>on {props.post?.created === null? "" : props.post?.created.substring(0,10)}
                                    </div>
                                    <div className="col">
                                        <Avatar></Avatar>
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
