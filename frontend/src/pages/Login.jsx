import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";

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
        <div className="flex justify-center items-center h-screen">

            <div className="w-[300px] flex space-y-5 flex-col">
                <h1 className="font-semibold text-3xl text-blue-800">Login</h1>

                <input
                    type="text"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
                <input
                    type="password"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="flex justify-between items-center">

                    <Link className="underline" to="/register">Login</Link>

                    <button className="py-1 px-5 text-white bg-blue-800" onClick={loginUser}>LOGIN</button>
                </div>

            </div>

        </div>
    )
}


export default Login;