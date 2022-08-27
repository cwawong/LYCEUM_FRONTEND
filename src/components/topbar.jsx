import React from 'react';

function Topbar(props) {
    return (
        <div className="" style={{width: "100%", display: "flex", height: props.topbarHeight,background: "#333", padding: "10px", justifyContent: "space-between", position: "fixed"}}>
            <div className="" style={{display: "flex", width: "50%", position: "relative"}}>
                <img style={{maxHeight:"80px", width: "auto", margin: "10px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnDz08lUWsDll_7m1NYkHV_U2gNmfvTWCGg&usqp=CAU" alt="No Image Loaded"/>
                <a className="navbar_a" href="/home"><strong>Home</strong></a>
                <a className="navbar_a" href="/view_1"><strong>View1</strong></a>
                <a className="navbar_a" href="/view_2"><strong>View2</strong></a>
            </div>
            <div className="" style={{display: "flex", width: "50%", justifyContent: "flex-end", position: "relative"}}>
                <a className="navbar_a" href="/login_page" style={{width: "150px", margin: "10px"}}><strong>Log In/ Sign Up</strong></a>
            </div>
        </div>
    );
}

export default Topbar;