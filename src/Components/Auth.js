import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Auth.css'
import Box from '@mui/material/Box';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState(true);
    const [toaststate, setToastState] = useState(false)
    const [logincred, setLogincred] = useState({
        Email: '',
        Password: ''
    })
    const [signupcred, setSignupcred] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        DOB: '',
        Password: ''
    });
    const [authToken, setAuthToken] = useState('')

    function signupHandler() {
        setAccount(false);
    }

    function loginHandler() {
        setAccount(true);
    }

    function signupcredHandler(e) {
        const { name, value } = e.target;
        setSignupcred({ ...signupcred, [name]: value });
    }

    function logincredHandler(e) {
        const { name, value } = e.target;
        setLogincred({ ...logincred, [name]: value });
    }


    async function signUp() {
        try {
            const response = await fetch('http://localhost:3002/users/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupcred),
            });

            if (response.ok) {
                const res = await response.json();

                setAuthToken(res.token);

                localStorage.setItem('token', res.token);
                navigate('/home')
            } else{
                
                alert("Email Already Exists!")
            }
        } catch (error) {
            console.log(error);
        }
    }



    async function login() {
        try {
            const response = await fetch('http://localhost:3002/users/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logincred),
            });

            console.log(response.status)

            if (response.ok) {
                const res = await response.json();

                setAuthToken(res.token);

                localStorage.setItem('token', res.token);
                navigate('/home')
            } else {
                alert("invalid credentials")
            }
        } catch (error) {
            console.log(error);
        }
    }







    return (

        <div>

           

            {account ? <Container className='authcontainer'>

                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}><span style={{ color: '#22297E', fontWeight: 'bolder', fontSize: '50px' }}>Social Connect</span> <br></br><span style={{ fontWeight: 'bold', fontSize: '20px' }}>Helps you to post your thoughts and share it accross multiple users</span></Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <div style={{ width: '500px', height: '400px', backgroundColor: 'white', boxShadow: '3px 3px rgba(0, 0, 0, 0.43)', borderRadius: '10px' }} className='Credbox'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    defaultValue="johndoe@example.com"
                                    style={{ width: '90%', margin: '10px' }}
                                    name='Email'
                                    onChange={logincredHandler}
                                    value={logincred.Email}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    style={{ width: '90%', margin: '10px' }}
                                    name='Password'
                                    onChange={logincredHandler}
                                    value={logincred.Password}
                                />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: '#22297E' }} onClick={login}>Login</Button>
                                <hr style={{ width: '100%', borderTop: '2px solid black', margin: '20px 0' }} />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={signupHandler}>Create a New Account </Button>
                                <h6 style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'lighter' }}>Forgot Password?</h6>
                            </Box>




                        </div>
                    </Col>
                </Row>
            </Container> : <Container className='authcontainer'>

                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}><span style={{ color: '#22297E', fontWeight: 'bolder', fontSize: '50px' }}>Social Connect</span> <br></br><span style={{ fontWeight: 'bold', fontSize: '20px' }}>Helps you to post your thoughts and share it accross multiple users</span></Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <div style={{ width: '500px', height: '600px', backgroundColor: 'white', boxShadow: '3px 3px rgba(0, 0, 0, 0.43)', borderRadius: '10px' }} className='Credbox'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    name='Email'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Email}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Firstname"
                                    name='FirstName'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Firstname}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Lastname"
                                    name='LastName'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Lastname}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Date Of Birth"
                                    name='DOB'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.DOB}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name='Password'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Password}
                                />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: '#22297E' }} onClick={signUp}>Sign Up</Button>
                                <hr style={{ width: '100%', borderTop: '2px solid black', margin: '20px 0' }} />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={loginHandler}>Already Have An Account? </Button>

                            </Box>




                        </div>
                    </Col>
                </Row>



            </Container>
            }

        </div>




    )
}

export default Auth;
