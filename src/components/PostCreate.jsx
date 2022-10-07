import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AccountContext, APIContext, SearchContext} from "../contexts/Contexts";
import Topbar from "./Topbar";
import {Autocomplete, Button, Chip, Divider, IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from "@mui/icons-material/Search";
function PostCreate(props) {
    const navigate = useNavigate();

    const API = useContext(APIContext);
    const account = useContext(AccountContext);
    const search = useContext(SearchContext);

    const [postTitle, setPostTitle] = useState("");
    const [postMessage, setPostMessage] = useState("")
    const [availableTags, setAvailableTags] = useState();
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentTags, setCurrentTags] = useState(null);

    useEffect(() => {
        if(account.getLogInStatus === 'guest') {
            navigate('/home');
            return;
        }
        const response = async () => await API.getObject("tag", "all");
        response().then(json => {
            if (json === "failed")
                return;
            const tags = [];
            for(let i = 0; i < json.length; i++){
                tags.push(json[i].name);
            }
            tags.sort();
            setAvailableTags(tags);
        });
    }, [])

    const handleCurrentTagAdded = (event) => {
        if (currentTags === null ||currentTags === "undefined") {
            return;
        }
        let tempSelected = selectedTags;
        let tempAvailable = availableTags.filter((tag) => tag !== currentTags);
        tempSelected.push(currentTags);
        tempSelected.sort();
        tempAvailable.sort();
        setSelectedTags(tempSelected);
        setCurrentTags(null);
        setAvailableTags(tempAvailable);
    }
    const handleSelectedTagDelete = tags => event => {
        let tempSelected = selectedTags.filter(tag => tag !== tags);
        let tempAvailable = availableTags.filter((tag) => tag !== currentTags);
        tempAvailable.push(tags);
        tempSelected.sort();
        tempAvailable.sort();
        setSelectedTags(tempSelected);
        setAvailableTags(tempAvailable);
    }

    const handlePostCreation = async (event) => {
        event.preventDefault();

        let json = {
            title: postTitle,
            message: postMessage,
            tags: selectedTags,
            user: account.getAccount.id,
        }
        let response = await API.postObject("post", json);
        navigate("/");
    }

    const handlePostDiscard = event => {
        navigate('/');
        return;
    }

    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div className="container"
                 style={{paddingTop: props.topbarHeight, backgroundColor: "#1A1A1A",}}>
                <div className="row"
                     style={{justifyContent: "center", paddingTop: "2%", textAlign: "center"}}>
                    <h1 style={{color: "white", fontFamily: "ariel"}}>Post your question here!</h1>
                    <form onSubmit={handlePostCreation}>
                        <div className="row" style={{alignItems: "center"}}>
                            <p style={{width: "15%", marginRight: "5%", color: "white", fontFamily: "sans", textAlign: "right"}}>TITLE:</p>
                            <TextField required label="Title" onChange={(event) => setPostTitle(event.target.value) }
                                       style={{width: "80%", height: "100%"}}/>
                        </div>
                        <div className="row" style={{alignItems: "center", marginTop: "3%"}}>
                            <p style={{width: "15%", marginRight: "5%", color: "white", fontFamily: "sans", textAlign: "right"}}>MESSAGE:</p>
                            <TextField required label="Message" onChange={(event) => setPostMessage(event.target.value) }
                                       style={{width: "80%", height: "100%"}}/>
                        </div>
                        <div className="row" style={{ marginTop: "3%"}}>
                            <div className="d-block" style={{width: "20%"}}>
                                <p style={{width: "75%", color: "white", fontFamily: "sans",textAlign: "right"}}>TAGS:</p>

                                <div className="d-flex">
                                <IconButton type="button" style={{width: "25%"}} onClick={handleCurrentTagAdded}><AddCircleOutlineIcon/></IconButton>
                                <Autocomplete  value={currentTags} style={{width: "75%"}}  onChange={(event, value) => {setCurrentTags(value);}} renderInput={(params) => <TextField {...params} label="Tags here!" style={{width: "100%"}}/>} options={availableTags} />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap" style={{width: "80%", border: "1px solid white", borderRadius: "20px", padding: "1%"}}>
                                {selectedTags.map((tags) => <Chip style={{marginRight: "1%"}} label={tags} onDelete={handleSelectedTagDelete(tags)}/>)}
                            </div>
                        </div>
                        <Divider style={{margin: "2%"}}/>
                        <Button type="submit" variant="contained" style={{width: "10%"}}>Create</Button>
                        <Button variant="outlined" style={{width: "10%", marginLeft: "2%"}} onClick={handlePostDiscard}>Discard</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostCreate;
