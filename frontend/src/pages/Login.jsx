import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import '../styling/Auth.css';

const Login = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = async () => {
        const userObj = {
            username, password
        };

        try {
            toast.loading('Loading...');
            const response = await axios.post('api/auth/login', userObj);
            toast.dismiss();
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("user", response.data.data);
                navigate('/')
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            toast.dismiss();
            toast.error('Something went wrong!');
        }
    }

    return (
        <div className="login">

            <div className="login-container">
                <div className="back-arrow">Return home</div>
                <h1 className="login-title">Login</h1>

                <input
                    type="text"
                    className="login-input"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="login-options">

                    <Link className="login-link" to="/register">Click here to register</Link>

                    <button className="login-button" onClick={loginUser}>LOGIN</button>
                </div>

            </div>

        </div>
    )
}

export default Login;