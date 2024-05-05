import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Places from '../pages/Places';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Place from '../pages/Place';
import Menu from '../pages/Menu';
import Orders from '../pages/Orders';
import MenuSettings from '../pages/MenuSettings';

function App () {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/menu/:id/:table' element={<Menu />} />
                    <Route exact path='/places/:id' element= { <PrivateRoute> {<Place />} </PrivateRoute> } />
                    <Route exact path='/places' element= { <PrivateRoute> {<Places />} </PrivateRoute> } />
                    <Route exact path='/places/:id/orders' element= { <PrivateRoute> {<Orders />} </PrivateRoute> } />
                    <Route exact path='/places/:id/settings' element= { <PrivateRoute> {<MenuSettings />} </PrivateRoute> } />
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </AuthProvider>
    )
}

export default App;