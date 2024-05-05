import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const MainLayout = ({ children }) => {
    
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const onSignIn = () => {
        navigate("/login");
    }

    const onRegister = () => {
        navigate("/register");
    }

    const onSignOut = () => {
        auth.signOut();
        navigate('/login');
    }

    const goToPlaces = () =>{
        navigate("/places"); 
    }
    
    return (
        <>
            <Navbar bg = 'light' variant='light' className='mb-4'>
                <Navbar.Brand href="/">QR Menu</Navbar.Brand>

                <Nav>
                    <Nav.Link onClick = {goToPlaces} >Places</Nav.Link>
                </Nav>

                <Nav className='flex-grow-1 justify-content-end'>
                    {auth.token ?  (
                        <Nav.Link onClick = {onSignOut} >Logout</Nav.Link>
                    ) : (
                        [
                        <Nav.Link key={1} onClick = {onSignIn} >Login</Nav.Link>,
                        <Nav.Link key={2} onClick = {onRegister} >Register</Nav.Link>
                        ]
                        )
                    }

                </Nav>
            </Navbar>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default MainLayout;