import React, {useEffect, useState} from 'react';
import Topbar from "./Topbar";
import {AccountContext, APIContext} from "../contexts/Contexts";
import PostExtract from "./PostExtract";
import {Button, Divider, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Swiper from 'react-id-swiper';
import AliceCarousel from 'react-alice-carousel';

function HomePage(props) {
    const navigate = useNavigate();

    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);

    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState("");
    const [draftMode, setDraftMode] = useState(false);

    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30
    }

    const handleTagCreation = async event => {
        event.preventDefault();

        let json = {
            name: tags
        }
        let response = await API.postObject("tag", json);
        alert(`Tag ${tags} is successfully created.`);
        setDraftMode(false);
    }
    //
    // const postElements = () => {
    //     let arr = [];
    //     posts.forEach(post =>
    //         arr.push(<div className="row"><PostExtract key={post.id} post={post}/></div>)
    //     );
    //     console.log(arr)
    //     return arr;
    // }

    useEffect(() => {
        const response = async () => await API.getObject("post", "all");
        response().then(json => {
            if (json === "failed")
                return;
            setPosts(json);
        });
    }, [])
    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight, backgroundColor: "#1A1A1A"}}>
                <div className="container d-block" style={{marginTop: "1%"}}>
                    {account.getLogInStatus === "member" &&
                        <div className="row">
                            <div className="col" style={{justifyContent: "center"}}>
                                <Button variant="outlined"
                                        style={{fontSize: "100%", color: "#FFFFFF", width: "100%", marginBottom: "5%"}}
                                        onClick={(event) => navigate("/create")}>
                                    <strong>Post a question</strong>
                                </Button>
                            </div>
                            <div className="col" style={{justifyContent: "center"}}>
                                <Button variant="outlined"
                                        style={{fontSize: "100%", color: "#FFFFFF", width: "100%", marginBottom: "5%"}}
                                        onClick={(event) => setDraftMode(true)}>
                                    <strong>Create a tag</strong>
                                </Button>
                            </div>
                        </div>
                    }
                    {draftMode &&
                        <form onSubmit={handleTagCreation} className="d-flex" style={{justifyContent: "space-between", marginTop: "2%", marginBottom: "2%", height: "100%"}}>
                            <TextField required label="Tag"
                                       style={{width: "75%",}} onChange={(event) => {setTags(event.target.value);}}/>
                            <Button variant="outlined" style={{width: "10%"}} onClick={(event => setDraftMode(false))}>Discard</Button>
                            <Button type="submit" variant="contained" style={{width: "10%"}}>Create</Button>
                        </form>
                    }
                    <h1 style={{marginBottom: "5%", color: "white", fontFamily: "ariel"}}>Top Picks For You:</h1>
                    {posts.map((post) => <div className="row"><PostExtract key={post.id} post={post}/><Divider
                        style={{marginBottom: "5%"}}/></div>)}

                </div>
            </div>
        </div>
    );

}

export default HomePage;
