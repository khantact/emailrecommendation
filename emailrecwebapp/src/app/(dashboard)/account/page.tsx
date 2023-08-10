"use client"
import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import { useState, useEffect } from 'react'
import { EmailAuthProvider, deleteUser, onAuthStateChanged, reauthenticateWithCredential, signOut, updatePassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { db } from '@/utils/firebase';
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './page.css'
import ConfirmationDialog from "@/components/confirmationdialog/ConfirmationDialog";
const AccountSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isRecommendationsEnabled, setIsRecommendationsEnabled] = useState(true);
  const [notification, setNotification] = useState('');
  const [notificationError, setNotificationError] = useState(false);
  const [confirmDeletePassword, setConfirmDeletePassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchRecommendationsStatus(user.uid);
      } else {
        router.push('/login');
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, [auth, router]);

  const fetchRecommendationsStatus = async (userId : string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIsRecommendationsEnabled(data.recommendationsEnabled);
      } else {
        alert('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };
    
  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    console.log('Password reset')
    e.preventDefault();
    const userEmail = user?.email;
    if (!userEmail) {
      router.push('/login');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setNotification('Passwords do not match');
      console.log('Passwords do not match')
      setNotificationError(true);
      return;
    } 
    if (newPassword.length < 6) {
      setNotification('Password must be at least 6 characters');
      setNotificationError(true);
      return;
    }
    const credential = EmailAuthProvider.credential(userEmail, currentPassword);
    await reauthenticateWithCredential(user, credential).then(() => {
      updatePassword(user, newPassword).then(() => {
        toast.success('Password reset successfully!')
        setNotification('Password reset successfully!');
        setNotificationError(false);
      })
      //TODO: send email to user
    }).catch((error) => {
      error.message = 'Password reset failed';
      setNotification(error.message);
      setNotificationError(true);
    })

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleRecommendationsToggle = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { recommendationsEnabled: !isRecommendationsEnabled });
      setIsRecommendationsEnabled(!isRecommendationsEnabled);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  

  const dismissNotification = () => {
    setNotification('');
  };
  const handleAccountCancelDeletion = () => {
    setShowConfirmation(false);
  }
  const handleAccountDeletion = () => {
    setShowConfirmation(true);
  }
  
  const handleAccountDeletionConfirmation = async (password : string) => {
    setShowConfirmation(true);
    try {
      if (user){
        const userEmail = user?.email;
        if (!userEmail) {
          return;
        }
        const userRef = doc(db, 'users', user.uid);
        const credential = EmailAuthProvider.credential(userEmail, password);
        await reauthenticateWithCredential(user, credential).then(async () => {
          await deleteDoc(userRef);
          await deleteUser(user);
          signOut(auth);
          router.push('/login');
        }).catch((error) => {
          alert(error.message);
          alert(confirmDeletePassword);
        })
      }
    } catch (e) {
      console.error('Error deleting account:', e);
    }
  }

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
        <label htmlFor="confirmNewPassword" className="block font-medium mb-1">Confirm New Password</label>
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full text-black"
          required
        />
      </div>
      <button type="submit" onClick={handlePasswordReset} className="flex flex-initial flex-col items-center w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition ease-in mb-6">Reset Password</button>
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
    {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={password => handleAccountDeletionConfirmation(password)}
          onCancel={handleAccountCancelDeletion}
        />
      )}
  </div>
  <ToastContainer />
</div>

  )
}

export default AccountSection