"use client"
import React, { useState, useEffect } from 'react';
import '../../utils/firebase';
import { db } from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  useEffect(()=> {
    if (notification) {
      const timer = setTimeout(()=> {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const calcPasswordStrength = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    var strength = 0;
    strength += password.length >= minLength ? 25 : 0;
    strength += hasUppercase ? 25 : 0;
    strength += hasLowercase ? 25 : 0;
    strength += hasNumbers ? 25 : 0;
    strength += hasSpecialChar ? 25 : 0;
    return strength;
  }

  const handlePassChange = (e:any) => {
    setPassword(e.target.value);
    setPasswordStrength(calcPasswordStrength(password));
  }
  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const auth = getAuth();
    if (email !== confirmEmail) {
      setNotification('Emails do not match!');
      return;
    }
    if (password !== confirmPassword) {
      setNotification('Passwords do not match!');
      return;
    }
    
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
        console.log("There has been an error in creating document");
        console.error(e);
      }
      alert("User created successfully");
      router.push('/preferences');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    })
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-950 to-indigo-900">
      <div className="w-full max-w-md">
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
        {notification && <div className="text-white text-center mb-4 p-2 bg-red-700 rounded-md">{notification}</div>}
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
            <label htmlFor="email" className="block mb-1">Confirm Email Address</label>
            <input
              type="email"
              id="email"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
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
              onChange={handlePassChange}
              required
            />
          </div>
          <div className='relative mt-2 h-2 '>
            <div
                className={`absolute top-0 h-2 rounded-md ${
                  passwordStrength > 75
                    ? 'bg-green-500'
                    : passwordStrength > 50
                    ? 'bg-yellow-500'
                    : passwordStrength > 25
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${passwordStrength}%` }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Confirm Password</label>
            <input
              type="password"
              id="password"
              className="bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
