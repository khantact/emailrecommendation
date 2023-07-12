"use client"
import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import { useState, useEffect } from 'react'
import './page.css'
const AccountSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isRecommendationsEnabled, setIsRecommendationsEnabled] = useState(true);
  const [notification, setNotification] = useState('');

  const handlePasswordReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Perform password reset logic using currentPassword and newPassword
    // ...
    console.log('Password reset');
    setNotification('Password reset successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleRecommendationsToggle = () => {
    setIsRecommendationsEnabled(!isRecommendationsEnabled);
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (notification) {
      timer = setTimeout(() => {
        dismissNotification();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification]);
  

  const dismissNotification = () => {
    setNotification('');
  };

  const handleAccountDeletion = () => {
    // Perform account deletion logic
    // ...
    console.log('Account deleted');
  };
  return (
    <div className='flex'>
      <Dashboard />
      <div className="container mx-auto px-4 py-8 mt-12">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      {notification && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 flex justify-between notification">
            <span>{notification}</span>
            <button onClick={dismissNotification} className="text-white">
              X
            </button>
          </div>
        )}
      <form onSubmit={handlePasswordReset} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block font-medium mb-1">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            id="newPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full text-black"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-black py-2 px-4 rounded-md">Reset Password</button>
      </form>
      <div className='mb-6'>
        <button onClick={handleRecommendationsToggle} className={isRecommendationsEnabled ? 'bg-red-500 text-white py-2 px-4 rounded-md' : "bg-green-500 text-white py-2 px-4 rounded-md"}>{isRecommendationsEnabled ? 'Disable Reccomendations': 'Enable Reccomendations'}</button>
      </div>

      <button onClick={handleAccountDeletion} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete Account</button>
    </div>
    </div>
  )
}

export default AccountSection