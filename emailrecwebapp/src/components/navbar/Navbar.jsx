"use client";
import { useState } from "react";
import React from "react";
import "./navbar.css";
import { useAuth } from '../../context/authContext'
import Link from "next/link";
const Navbar = () => {
    const [activeLink, setLinkActive] = useState(0);
    const [active, setActive] = useState(-1);
    const { currentUser, logOut } = useAuth();

    return(
        <div className="">
            <nav >
                <ul className="flex justify-start mt-0 p-0 bg-indigo-900 drop-shadow-lg">
                    <li><Link href="/" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Home</Link></li>
                    <li className=""><Link href="/about" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">About</Link></li>
                    { currentUser ? <>
                    <li className=""><Link href="/papers" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Papers</Link></li>
                    <li className="ml-auto"><Link href="/preferences" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Profile</Link></li> 
                    <li><Link href="/" onClick={logOut} className="cursor-pointer p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Log Out</Link></li>
                    </>
                    : 
                    <>
                    <li className="ml-auto"><Link href="/register" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Register</Link></li>
                    <li><Link href="/login" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Log In</Link></li>
                    </>}
                </ul>
            </nav>
        </div>
    )
};
export default Navbar;