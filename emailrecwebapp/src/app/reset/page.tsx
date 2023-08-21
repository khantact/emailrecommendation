
"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation';

const ResetPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationError, setNotificationError] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    console.log('Password reset')
    e.preventDefault();
    if (!userEmail) {
      router.push('/login');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setNotification('Passwords do not match');
      setNotificationError(true);
      return;
    } 
    if (newPassword.length < 6) {
      setNotification('Password must be at least 6 characters');
      setNotificationError(true);
      return;
    }
    try {
      console.log('Send password reset email to USER')
      await sendPasswordResetEmail(auth, userEmail);
      setNotification('Password reset email sent!');
      setNotificationError(false);
    } catch (error) {
      setNotification('Error sending password reset email');
      setNotificationError(true);
    }
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center bg-indigo-900 p-6 rounded-md">
        <input
          type="text"
          className="text-lg mb-4 rounded-md bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="text-lg mb-4 rounded-md bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          className="text-lg mb-4 rounded-md bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <button className="p-3 text-lg mb-4 border-none bg-white text-peach bg-indigo-700 rounded-md hover:bg-indigo-800 transition ease-in " onClick={handlePasswordReset}>
          Send password reset email
        </button>
        <div className="mt-4 text-peach">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account? <Link href="/register" className="hover:text-indigo-500 transition ease-in underline">Register</Link> now.
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
