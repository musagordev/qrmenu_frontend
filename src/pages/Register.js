import { React, useState, useEffect, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.token) {
            navigate('/places');
        }
    });

    const onClick = () => {
        auth.register(username,password, () => navigate('/places'));
    }

    return (
        <MainLayout>
            <Row className = "justify-content-center">
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className = "text-center">
                                <b>REGISTER</b>
                            </h3>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Username" 
                                    value = {username} 
                                    onChange = {(e) => setUsername(e.target.value)} 
                                />                                
                                                            </Form.Group>
                            <Form.Group>                                                                
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    value = {password} 
                                    onChange = {(e) => setPassword(e.target.value)} 
                                />
                            </Form.Group>
                            <Button variant="standard" onClick={onClick} disabled = {auth.loading}>
                                {
                                    auth.loading ? (
                                        <Spinner 
                                            variant = "standard"
                                            as="span"
                                            animation="border"
                                            size = "sm"
                                            role = "status"
                                            aria-hidden ="true" 
                                        />
                                    ) : (
                                        "Register"
                                    )
                                } 
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
}



export default Register;