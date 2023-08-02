import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import '../styling/Auth.css';

const Register = () => {

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        const userObj = {
            name, username, email, password
        };
        try {
            toast.loading('Loading...')
            const response = await axios.post('api/auth/register', userObj);
            toast.dismiss();
            if (response.data.success) {
                toast.success(response.data.message);
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
        <div className="register">

            <div className="register-container">
                <h1 className="register-title">Registration</h1>

                <input
                    type="text"
                    className="register-input"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    className="register-input"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
                <input
                    type="email"
                    className="register-input"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    className="register-input"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="register-options">

                    <Link className="register-link" to="/login">Click Here to Login</Link>

                    <button className="register-button" onClick={registerUser}>REGISTER</button>
                </div>

            </div>

        </div>
    )
}

export default Register;
