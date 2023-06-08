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
                <ul className="navBar drop-shadow-md bg-violet-800">
                    <li><a href="/" className="transition ease-in delay-50 hover:bg-violet-600">Home</a></li>
                    <li><a href="/about" className="transition ease-in delay-50 hover:bg-violet-600">About</a></li>
                    <li><a href="/Papers" className="transition ease-in delay-50 hover:bg-violet-600">Papers</a></li>
                    <li><a href="/Register" className="transition ease-in delay-50 hover:bg-violet-600">Register</a></li>
                    <li><a href="/Log In" className="transition ease-in delay-50 hover:bg-violet-600">Log In</a></li>
                </ul>
            </nav>
        </div>
    )
};
export default Navbar;