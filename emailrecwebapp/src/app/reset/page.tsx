"use client"
import { sendPasswordReset } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResetPage = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user) router.push("/dashboard");
  }, [router, user]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center bg-indigo-900 p-6 rounded-md">
        <input
          type="text"
          className="text-lg mb-4 rounded-md bg-peach text-black w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="p-3 text-lg mb-4 border-none bg-white text-peach bg-indigo-700 rounded-md hover:bg-indigo-800 transition ease-in " onClick={() => sendPasswordReset(email)}>
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