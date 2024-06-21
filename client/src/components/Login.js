import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../pages/Authcontex';

const LoginForm = () => {
    const {  login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('food-order-vert-kappa.vercel.app/login', {
                email,
                password
            });
            console.log(response.data); // handle successful login (e.g., store token)
            localStorage.setItem('myKey', 'myValue');
            setRedirect(true); // Set redirect state to true
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('Failed to log in');
            }
        }
    };

    // Redirect to home if logged in
    if (redirect) {
        return  <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <h2 className="text-2xl mb-4 font-bold text-center">Login Successful</h2>
            <p className="text-green-500 text-sm mb-4">You have successfully logged in!</p>
            <p className="text-sm mb-4">Redirecting to home...</p>
            {/* You can use JavaScript setTimeout to simulate redirection */}
            {setTimeout(() => {
                window.location.href = '/'; // Redirect to home after delay
            }, 2000)}
        </div>
    </div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
