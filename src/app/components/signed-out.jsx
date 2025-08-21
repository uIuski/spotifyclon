"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const SignedIn = ({ children }) => {
  const [user] = useAuthState(auth);
 
  if (user) return null;

  return <>{children}</>;
};