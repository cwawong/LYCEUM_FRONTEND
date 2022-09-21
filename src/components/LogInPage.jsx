import React, {useState} from 'react';
import Topbar from "./Topbar";
import Nav from 'react-bootstrap/Nav'
import {AccountContext, APIContext} from "../contexts/Contexts";
import { useNavigate } from 'react-router-dom';







function LoginPage(props) {
    const account = React.useContext(AccountContext);
    const API = React.useContext(APIContext);

    const navigate = useNavigate();

    const[state, setState] = useState("login");
    const[name, setName] = useState("");
    const[gender, setGender] = useState("M");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState([]);

    const handleLogIn = async (event) => {
        event.preventDefault();
        let users = await API.getObject("user", "all");
        if (users === "failed")
            return;

        let selectedUser;

        users.forEach((user) => {
            if (user.email === email && user.password_hash === password)
                selectedUser = user;

        });
        if (typeof selectedUser === "undefined") {
            setMessage(["Invalid log in. Please try again."]);
            return;
        }
        account.setAccount(selectedUser);
        account.setLogInStatus("member");
        navigate("/home");
        alert(`Log in sucessful! Welcome ${selectedUser.name}!`);



    }

    const handleSignUp = (event) => {
        event.preventDefault();
        let errorMessage = [];
        if (name === "")
            errorMessage.push("Name field is blank.");
        if (email === "")
            errorMessage.push("Email field is blank.");
        if (password.length < 8)
            errorMessage.push("The length of password should be at least 8.");
        if (errorMessage.length > 0) {
            setMessage(errorMessage);
            return;
        }else{
            setMessage([]);
        }
        API.postObject("user", {
            name: name,
            gender: gender,
            email: email,
            phone: phone,
            password_hash: password,
        });
        alert("Successful Sign Up! Please log in.");
        navigate('/login');
    }

    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <div className="container-fluid" style={{marginTop:"2vh", width: "100%"}}>
                    <div className="row" style={{justifyContent: "center"}}>
                        <div className="col col-md-6 col-lg-6">
                            <div className="card">
                                <div className="card-header" style={{textAlign: "center", fontSize: "20px", padding: "0px"}}>
                                    <Nav variant="tabs" defaultActiveKey="login" fill justify onSelect={(selectedKey) => setState(selectedKey)}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="login">Log In</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="signUp">Sign Up</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className="card-body">
                                    {state === "login" &&
                                    <form onSubmit={handleLogIn}>
                                        <div>
                                            <label className="form-label">Email Address</label>
                                            <input type="email" id="loginEmailInput" placeholder="Email Address" className="form-control" onChange={(event)=> setEmail(event.target.value)}/>
                                        </div>
                                        <div>
                                            <label className="form-label">Password</label>
                                            <input type="password" id="loginPasswordInput" placeholder="Password" className="form-control" onChange={(event)=> setPassword(event.target.value)}/>
                                        </div>
                                        <br/>
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-block mb-4 form-control">Log In</button>
                                        </div>
                                    </form>
                                    }
                                    {state === "signUp" &&
                                        <form onSubmit={handleSignUp}>
                                            <div>
                                                <label className="form-label">Preferred Name</label>
                                                <input type="text" id="loginEmailInput" placeholder="Preferred Name" className="form-control" onChange={(event)=> setName(event.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="form-label">Gender</label>
                                                <select className="form-select" onChange={(event) => setGender(event.target.value)}>
                                                    <option selected="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="form-label">Email address</label>
                                                <input type="email" id="loginEmailInput" placeholder="Email Address" className="form-control" onChange={(event)=> setEmail(event.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="form-label">Phone No.</label>
                                                <input type="text" id="loginEmailInput" placeholder="Phone No." className="form-control" onChange={(event)=> setPhone(event.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="form-label">Password</label>
                                                <input type="password" id="loginPasswordInput" placeholder="Password" className="form-control" onChange={(event)=> setPassword(event.target.value)}/>
                                            </div>
                                            <br/>
                                            <div>
                                                <button type="submit" className="btn btn-primary btn-block mb-4 form-control">Sign Up</button>
                                            </div>
                                        </form>
                                    }
                                    <div style={{color: "red"}}>{message.map((message)=><li key={message}>{message}</li>)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;
