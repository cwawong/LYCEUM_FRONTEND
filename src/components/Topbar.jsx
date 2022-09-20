import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AccountContext, APIContext} from "../contexts/Contexts";
import {type} from "@testing-library/user-event/dist/type";

function Topbar(props) {
    const [objectName, setObjectName] = useState("");
    const [id, setID] = useState("");
    const API = useContext(APIContext);
    const [debugMode, setDebugMode] = useState(true);
    const [APIResponse, setAPIResponse] = useState([]);
    const APICaller = async () => {
        const response = await API.getObject(objectName, id);
        console.log(response);
        if(typeof response.length === "undefined" || typeof response === "string") {
            setAPIResponse([response]);
        }
        else{
            setAPIResponse(response);
        }
    }
    return (
        <div>
        <header>
            <div className="container-fluid position-fixed" style={{height: props.topbarHeight}}>
                <div className="row" style={{background: "grey"}}>
                    <div className="col-6 d-none d-xxl-inline-flex" style={{display: "flex"}}>
                        <img style={{maxHeight: "50px", width: "auto", margin: "10px"}}
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnDz08lUWsDll_7m1NYkHV_U2gNmfvTWCGg&usqp=CAU"
                             alt="No Image Loaded"/>
                        <Link className="navbar_link" to="/home"><strong>Home</strong></Link>
                        <Link className="navbar_link" to="/view_1"><strong>View1</strong></Link>
                        <Link className="navbar_link" to="/view_2"><strong>View2</strong></Link>
                    </div>
                    <div className="col-6" style={{display: "flex", justifyContent: "flex-end"}}>
                        <button className="btn btn-primary m-1" onClick={APICaller}>Call API(<strong>GET ONLY</strong>)</button>
                        <button className="btn btn-primary m-1" onClick={(event) => setDebugMode(!debugMode)}>Show Debugging Page</button>
                        <input className="m-1" style={{width: "10vw"}} placeholder="Object Name" onChange={(event)=> setObjectName(event.target.value)}/>
                        <input className="m-1" style={{width: "10vw"}} placeholder="ID" onChange={(event)=> setID(event.target.value)}/>
                        <Link className="navbar_link" to="/login_page" style={{width: "150px", margin: "10px"}}>
                            <strong>Log In/ Sign Up</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    {
        debugMode &&
        <div className="container position-fixed" style={{marginTop: `70px`, width: "20%", height: "100%", right: "0px", background: "lightgrey"}}>
            <h2>DEBUGGIN CONSOLE</h2>
            {APIResponse.map(response => <li>{JSON.stringify(response)}</li>)}
        </div>
    }
        </div>
    );
}

export default Topbar;