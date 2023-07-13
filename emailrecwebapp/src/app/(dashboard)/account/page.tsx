"use client"
import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import { useState, useEffect } from 'react'
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import './page.css'
const AccountSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isRecommendationsEnabled, setIsRecommendationsEnabled] = useState(true);
  const [notification, setNotification] = useState('');
  const [notificationError, setNotificationError] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();


  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userEmail = user?.email;
    if (!userEmail) {
      router.push('/login');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setNotification('Passwords do not match');
      setNotificationError(true);
      return;
    }
    const credential = EmailAuthProvider.credential(userEmail, currentPassword);
    await reauthenticateWithCredential(user, credential).then(() => {
      updatePassword(user, newPassword).then(() => {
        setNotification('Password reset successfully!');
        setNotificationError(false);
      })
      //TODO: send email to user
    }).catch((error) => {
      setNotification('Incorrect password, please try again');
      setNotificationError(true);
    })

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleRecommendationsToggle = () => {
    setIsRecommendationsEnabled(!isRecommendationsEnabled);
  };

  // useEffect(() => {
  //   let timer: string | number | NodeJS.Timeout | undefined;
  //   if (notification) {
  //     timer = setTimeout(() => {
  //       dismissNotification();
  //     }, 3000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [notification]);
  

  const dismissNotification = () => {
    setNotification('');
  };

  const handleAccountDeletion = () => {
    // Perform account deletion logic
    // ...
    console.log('Account deleted');
  };
  return (
  <div className="flex overflow-y-hidden h-screen">
  <Dashboard />
  <div className="flex flex-col mx-auto px-4 py-8 mt-12 w-full items-center">
    <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
    {notification && (
      <div
        className={
          notificationError
            ? 'bg-red-600 text-white px-4 py-2 rounded-md mb-4 flex justify-between notification w-1/2'
            : 'bg-green-600 text-white px-4 py-2 rounded-md mb-4 flex justify-between notification w-1/2'
        }
      >
        <span>{notification}</span>
        <button onClick={dismissNotification} className="text-white">
          X
        </button>
      </div>
    )}
    <section className="mb-6 w-1/2">
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
      <div className="mb-6">
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
      <button type="submit" className="flex flex-initial flex-col items-center w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition ease-in mb-6">Reset Password</button>
    </section>
    <hr className='border-1 border-white mb-6 w-full drop-shadow-md'/>
    <section className="mb-6 flex flex-col items-center">
      <button onClick={handleRecommendationsToggle} className={isRecommendationsEnabled ? 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition ease-in' : "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition ease-in"}>
        {isRecommendationsEnabled ? 'Disable Recommendations' : 'Enable Recommendations'}
      </button>
    </section>
    <section className=''>
      <button onClick={handleAccountDeletion} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition ease-in">Delete Account</button>
    </section>
  </div>
</div>

  )
}

export default AccountSection