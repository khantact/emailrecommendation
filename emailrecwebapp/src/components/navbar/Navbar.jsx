"use client";
import { useState } from "react";
import React from "react";
import "./navbar.css";

const Navbar = () => {
    const [activeLink, setLinkActive] = useState(0);
    const [active, setActive] = useState(-1);
    return(
        <div>
            <nav>
                <ul className="flex justify-start mt-0 p-0 bg-indigo-900 drop-shadow-lg">
                    <li><a href="/" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Home</a></li>
                    <li className=""><a href="/about" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">About</a></li>
                    <li className=""><a href="/papers" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Papers</a></li>
                    <li className="ml-auto"><a href="/register" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Register</a></li>
                    <li><a href="/login" className="p-3 text-violet-50 block transition ease-in delay-50 hover:bg-violet-600">Log In</a></li>
                </ul>
            </nav>
        </div>
    )
};
export default Navbar;