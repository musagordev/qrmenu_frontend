import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import Order from "../components/Order";

import { fetchOrders, completeOrder } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const onBack = () => navigate(`/places/${params.id}`);

    const onFetchOrders = async () =>{
        const json = await fetchOrders(params.id, auth.token);
        if (json) {
            console.log(json);
            setOrders(json);
        }
    }

    const onCompleteOrder = async (orderId) => {
        const json = await completeOrder(orderId, { status: 'completed' }, auth.token );
        if (json) {
            onFetchOrders();
        }
    }

    useEffect(() => {
        onFetchOrders();
        const interval = setInterval(() => {
            onFetchOrders();    
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout>
            <div className="d-flex align-items-center mb-4">
                <Button variant="link" onClick={onBack}>
                    <IoMdArrowBack size = {25} color="black"/>
                </Button>
                <h3 className="mb-0 ml-2 mr-2">My Orders</h3>
            </div>

            <Row className="justify-content-center">
                {orders?.filter((order) => order.status === 'processing')?.map((order) => (
                    <Col key={order.id} lg={8}>
                        <Order order={order} onComplete = {() => onCompleteOrder(order.id)}/>
                    </Col>
                ))}
            </Row>
        </MainLayout>
    );
}

export default Orders