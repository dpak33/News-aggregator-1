import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

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
        <div className="flex justify-center items-center h-screen">

            <div className="w-[300px] flex space-y-5 flex-col">
                <h1 className="font-semibold text-3xl text-blue-800">Registration</h1>

                <input
                    type="text"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
                <input
                    type="email"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    className="py-1 px-3 border-2 border-blue-800 focus:outline-none w-full"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="flex justify-between items-center">

                    <Link className="underline" to="/login">Click Here to Login</Link>

                    <button className="py-1 px-5 text-white bg-blue-800" onClick={registerUser}>REGISTER</button>
                </div>

            </div>

        </div>
    )
}

export default Register;