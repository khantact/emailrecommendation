"use client"
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import '../../utils/firebase';
import { useRouter } from 'next/navigation';
import '../../utils/authUtils';

