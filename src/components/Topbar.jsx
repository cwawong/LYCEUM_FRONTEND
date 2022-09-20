import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AccountContext, APIContext} from "../contexts/Contexts";

function Topbar(props) {
    const [APILink, setAPILink] = useState();
    const API = useContext(APIContext);
    const APICaller = () => {
        API.putObject("post", 3, {message: "test update"});
    }
    return (
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
                        <button className="btn btn-primary m-1" onClick={APICaller}>Call API</button>
                        <input className="m-1" style={{width: "20vw"}} placeholder="API LINK" defaultValue="http://127.0.0.1:8000/api/" onChange={(event)=> setAPILink(event.target.value)}/>
                        <Link className="navbar_link" to="/login_page" style={{width: "150px", margin: "10px"}}>
                            <strong>Log In/ Sign Up</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;