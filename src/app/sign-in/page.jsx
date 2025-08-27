"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function SignIn() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, signInUser] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  
  useEffect(() => {
    if (signInUser) {
      router.push("/");
    }
  }, [signInUser, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result) {
        console.log("Exitoso");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  if (user) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 overflow-y-auto">
      <div className="relative p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 my-8 ">
       <div className="flex flex-col items-center justify-center gap-4">

            <button onClick={() => router.push("/")} className="cursor-pointer">
                <img src="/spotifyg.svg" alt="logito" width={40} height={40}/>
            </button>
            
       
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Inicia Sesión en Spotify</h1>
       </div>
    
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value || "")}
              value={email || ""}
              placeholder="Email"
              required
              className="w-full text-lg px-3 py-3 rounded-sm border-1 border-neutral-500 bg-black text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value || "")}
              value={password || ""}
              placeholder="Contraseña"
              required
              className="w-full text-lg px-3 py-3 rounded-sm border-1 border-neutral-500 bg-black text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button
            type="submit"
            
            className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-400 text-black font-semibold px-4 py-3 rounded-4xl transition-all duration-200 transform disabled:scale-100 disabled:cursor-not-allowed cursor-pointer text-lg"
          >
            Continuar
          </button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-gray-400">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              className="text-white underline font-medium cursor-pointer"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}