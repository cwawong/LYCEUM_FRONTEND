import React, {useState} from 'react';
import Topbar from "./topbar";
import Nav from 'react-bootstrap/Nav'




function LoginPage(props) {
    const[state, setState] = useState('login');
    const[name, setName] = useState('');
    const[gender, setGender] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[password, setPassword] = useState('');

    const handleLogIn = (event) => {
        event.preventDefault();
        console.log(event);
        alert("Successful Log In!");
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        alert("Successful Sign Up!");
    }

    return (
        <div>
            <Topbar topbarHeight={props.topbarHeight}></Topbar>
            <div style={{paddingTop: props.topbarHeight}}>
                <div className="container-fluid" style={{marginTop:"1vw", width: "100%"}}>
                    <div className="row" style={{justifyContent: "center"}}>
                        <div className="col-8 col-md-6 col-lg-6">
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
                                                <input type="email" id="loginEmailInput" placeholder="Preferred Name" className="form-control" onChange={(event)=> setName(event.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="form-label">Gender</label>
                                                <select className="form-select" onChange={(event) => setGender(event.target.value)}>
                                                    <option value="M">Male</option>
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