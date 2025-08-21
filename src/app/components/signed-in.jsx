"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignedIn = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();


  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);




  if (user) return <>{children}</>;


  return null;
};