import React, { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase.js';
import { getDoc, doc, updateDoc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation';
const Preferencesform = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [preferencesRef , setPreferencesRef] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setPreferencesRef(doc(db, "users", user.uid));
      } else {
        router.push('/login');
      }
    });
    return unsubscribe;
  } , [router]);
  
  useEffect(() => {
    if (!preferencesRef) {
      return;
    }
    const unsub = onSnapshot((preferencesRef), (doc : DocumentSnapshot<any>) => {
      if (doc.exists()) {
        const temp = (doc.data()?.preferences);
        if (temp) {
          setPreferences(temp);
        }
      } else {
        console.log("No such document!");
      }
    })
      return unsub;
  }), [preferencesRef]
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddPreference = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    if (preferences.length >= 5) {
      setErrormessage('You can only add 5 preferences');
      return;
    }

    // setPreferences((prevPreferences) => [...prevPreferences, inputValue]);
    await updateDoc(preferencesRef, {
      preferences: [...preferences, inputValue],
    }).then(() => { 
      console.log("Document successfully updated!");
    })
    setInputValue('');
    setErrormessage('');
  };

  const handleDeletePreference = async (index: number) => {
    // setPreferences((prevPreferences) =>
    //   prevPreferences.filter((_, i) => i !== index)
    // );
    await updateDoc(preferencesRef, {
      preferences: preferences.filter((_, i) => i !== index),
    }).then(() => {
      console.log("Document successfully updated!");
    })
  };

  return (
    <div>
      <div className="flex mt-12">
        <input
          type="text"
          placeholder="Enter preference"
          value={inputValue}
          onChange={handleInputChange}
          className="px-2 py-1 mr-2 rounded border border-gray-300 text-black"
        />
        <button
          onClick={handleAddPreference}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {errormessage && (
      <p className="text-red-500 mb-2">{errormessage}</p>
      )}
      <ul className="mt-4">
        {preferences.map((preference, index) => (
          <li
            key={index}
            className="flex items-center cursor-pointer hover:text-red-500"
            onClick={() => handleDeletePreference(index)}
          >
            <span className="mr-2">{preference}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-red-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13.586 10L19 15.414l-4.243 4.243-5.414-5.414L3.93 19 0 15.071l5.414-5.414L0 4.243 3.93 0l4.243 4.243L13.586 0 19 3.93l-4.243 4.243L19 13.586 15.071 19l-4.243-4.243L6.586 19 10 15.071l4.243 4.243L19 13.586 15.071 10z"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preferencesform;
