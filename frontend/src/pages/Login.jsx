import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import '../styling/Auth.css';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/userActions';
import jwtDecode from 'jwt-decode';

const Login = (props) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = async () => {
        const userObj = {
            username, password
        };

        try {
            toast.loading('Loading...');
            const response = await axios.post('http://localhost:8000/api/auth/login', userObj);
            toast.dismiss();
            if (response.data.success) {
                const token = response.data.data;
                const decodedToken = jwtDecode(token);
                const userId = decodedToken._id;
                console.log(userId);
                toast.success(response.data.message);
                localStorage.setItem("user", response.data.data);
                props.setUser(userId);
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
                <div className="top-section">
                    <div className="back-arrow">
                        <Link to="/">Return home</Link>
                    </div>
                </div>
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

const mapDispatchToProps = {
    setUser
};

export default connect(null, mapDispatchToProps)(Login);