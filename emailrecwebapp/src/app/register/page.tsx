"use client"
import React, { useState } from 'react';
import '../../utils/firebase';
import { db } from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const userId = userCredential.user.uid as string;
      try {
        setDoc(doc(db, 'users', userId),{
          fullName: fullName,
          email: email,
          preferences: [],
          recommendationsEnabled: true,
          papersSent: 0,
          papersReceived: [],
        }, {merge: true})
      } catch (e) {
        //console.log("There has been an error in creating document");
        toast.error("There has been an error in creating document");
      }
      router.push('/preferences');
      toast.success("User created successfully");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
    })
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-950 to-indigo-900">
      <div className="w-full max-w-md">
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800">Register</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
