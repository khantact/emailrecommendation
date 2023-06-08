"use client"
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

};

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-950 to-indigo-900">
      <div className="w-full max-w-md">
        <h2 className="text-peach text-2xl text-center font-bold mb-4">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-peach block mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;