"use client"
import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase'; // Make sure this import path is correct
import { collection, getDocs } from 'firebase/firestore'; 
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  data: any; // You can replace 'any' with a more specific type if you know the data structure
}

const Papers = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userDataArray: UserData[] = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push({ id: doc.id, data: doc.data() });
        });
        setUserData(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Papers</h1>
      {userData.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Full Name:</strong> {user.data.fullName}</p>
          <p><strong>Email:</strong> {user.data.email}</p>
          <p><strong>Preferences:</strong> {user.data.preferences.join(', ')}</p>
          <p><strong>Recommendations Enabled:</strong> {user.data.recommendationsEnabled ? 'Yes' : 'No'}</p>
          <p><strong>Papers Received:</strong></p>
          <ul>
            {user.data.papersReceived.map((paper: string, index: number) => (
              <li key={index}>{paper}</li>
            ))}
          </ul>
          <p><strong>Papers Sent:</strong> {user.data.papersSent}</p>
        </div>
      ))}
    </div>
  );
}

export default Papers;
