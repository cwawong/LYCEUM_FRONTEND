import React from 'react';
import {Link} from "react-router-dom";

function Topbar(props) {
    return (

        <header>
            <div className="container-fluid position-fixed" style={{height: props.topbarHeight}}>
                <div className="row" style={{background: "grey"}}>
                    <div className="col-6" style={{display: "flex"}}>
                        <img style={{maxHeight: "50px", width: "auto", margin: "10px"}}
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnDz08lUWsDll_7m1NYkHV_U2gNmfvTWCGg&usqp=CAU"
                             alt="No Image Loaded"/>
                        <Link className="navbar_link" to="/home"><strong>Home</strong></Link>
                        <Link className="navbar_link" to="/view_1"><strong>View1</strong></Link>
                        <Link className="navbar_link" to="/view_2"><strong>View2</strong></Link>
                    </div>
                    <div className="col-6" style={{display: "flex", justifyContent: "flex-end"}}>
                        <button className="btn btn-primary m-1" onClick={props.apiButtonOnclick}>Call API</button>
                        <button className="btn btn-primary m-1" onClick={props.clearAPIButtonOnclick}>Clear API</button>
                        <Link className="navbar_link" to="/login_page" style={{width: "150px", margin: "10px"}}><strong>Log
                            In/ Sign Up</strong></Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;