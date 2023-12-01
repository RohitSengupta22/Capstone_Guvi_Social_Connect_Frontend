import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css'
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


function NavbarComp() {

    const BASE_URL = 'https://social-connect-backend.onrender.com'

    const [data,setData] = useState({
        Email: '',
        Name: '',
        DOB: ''
    })

    const [initials,setInitials] = useState('')
    const authToken = localStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(()=>{

       async function fetchData(){
            const response = await fetch(`${BASE_URL}/users/user`,{
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": authToken
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
              });
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
              }

              const result = await response.json();
              const res = result.user;

              setData(prevData => ({
                ...prevData,
                Email: res.Email,
                Name: res.FirstName + " " + res.LastName,
                DOB: res.DOB
              }));

             setInitials(res.FirstName[0]+res.LastName[0]);

         


        }



        fetchData();
       
        

    },[])

    

    
    const [avatarCardStyle, setAvatarCardStyle] = useState({
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '200px',
        height: '200px',
        position: 'absolute',
        left: '80%'

    })

    const [showAvatarCard, setShowAvatarCard] = useState(false);

    const toggleAvatarCard = () => {
        setShowAvatarCard(!showAvatarCard);
    };

    function logoutHandler(){  //for logging out
        localStorage.removeItem('token')
        navigate('/')
        
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top">
                <Container>
                    <Navbar.Brand href="#home" style={{ color: '#22297E', fontWeight: 'bolder' }}>Social Connect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            


                        </Nav>



                        <Avatar
                            alt="Travis Howard"
                            className="ml-auto"
                            src=""
                            onMouseEnter={toggleAvatarCard}
                            onMouseLeave={toggleAvatarCard}
                            sx={{ bgcolor: deepPurple[500] }}
                        >{initials}</Avatar>
                        <Tooltip title="Logout">
                            
                            <LogoutIcon className='logout' onClick={logoutHandler}/>
                            
                        </Tooltip>
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className={`avatar ${showAvatarCard ? 'visible' : ''}`}>
                <h6 style={{ textAlign: 'center' }}>{data.Name}</h6>
                <hr />
                <h6 style={{ textAlign: 'center' }}>{data.Email}</h6>
                <hr />
                <h6 style={{ textAlign: 'center' }}>{data.DOB}</h6>
            </div>

        </>
    );
}

export default NavbarComp;