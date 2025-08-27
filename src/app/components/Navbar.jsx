"use client";

import Link from 'next/link';
import { auth } from "../firebase";
import React, { useState, useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';

export default function Navbar({ onSearchChange }) {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [menuOpened, setMenuOpened] = useState(false);
  const [perfilOpened, setPerfilOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchOpened, setMobileSearchOpened] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleMobileSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      setMobileSearchOpened(false);
      
    }
  };

  const openMobileSearch = () => {
    setMobileSearchOpened(true);
  };

  const closeMobileSearch = () => {
    setMobileSearchOpened(false);
    setSearchTerm(""); 
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error al salir:", error);
    }
  };

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  if (loading) {
    return (
      <nav className="w-full h-16 bg-black flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/spotify.svg" alt="Spotify" width={40} height={40} />
          </Link>
        </div>
        <div>Cargando...</div>
      </nav>
    );
  }

  if (error) {
    console.error("Error de autenticacion", error);
    return null;
  }

  return (
    <>
      <nav className="w-full h-16 bg-black flex items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img src="/spotifyg.svg" alt="Spotify" width={40} height={40} />
          </Link>
          <div className="hidden md:flex rounded-full bg-neutral-950 p-4">
            <Link href="/">
              <img
                src="/home.svg"
                alt="Home"
                className="fill-white filter invert-[70%]"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div className="hidden md:flex pr-70 py-3 bg-neutral-800 rounded-full flex items-center justify-center text-white">
            <button className="ml-3 flex items-center justify-center h-full">
              <img
                src="/search.svg"
                alt="Search"
                width={28}
                height={25}
                className="fill-white filter invert-[70%]"
              />
            </button>
            <input 
              type='text' 
              className='border-none outline-none bg-transparent text-white px-4 w-96' 
              placeholder='¿Que quieres reproducir?' 
              value={searchTerm} 
              onChange={handleSearchChange}
              onKeyDown={handleMobileSearch}
            />
          </div>
        </div>
        
        <div className="md:hidden">
          <button
            className="cursor-pointer"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <img
              src="/hamburger.svg"
              alt="Menu"
              className="fill-white filter invert-[100%]"
              width={40}
              height={40}
            />
          </button>
        </div>

        {menuOpened && (
          <div className="fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col p-6 z-50">
            <div className="flex justify-end">
              <button
                className="cursor-pointer"
                onClick={() => setMenuOpened(false)}
              >
                <img
                  src="/close.svg"
                  alt="Close"
                  className="fill-white filter invert-[100%]"
                  width={30}
                  height={30}
                />
              </button>
            </div>
            {!user ? (
              <div className="mt-10 space-y-6 text-lg font-semibold">
                <button
                  onClick={handleSignInClick}
                  className="block w-full text-left"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={handleSignUpClick}
                  className="block w-full text-left"
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-red-400 font-semibold"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={handleSignUpClick}
                className=" hover:text-white text-neutral-700 cursor-pointer font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Registrate
              </button>
              <button
                onClick={handleSignInClick}
                className="bg-white-500 text-black cursor-pointer font-semibold px-7 rounded-4xl p-3 bg-white transition-colors"
              >
                Iniciar Sesión
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-neutral-800 p-2 rounded-full">
                <div className="relative w-8 h-8 bg-gray-500 rounded-full flex cursor-pointer items-center justify-center">
                </div>
              </div>
              {perfilOpened && (
                <div className="absolute right-2 top-14 mt-2 w-46 bg-neutral-800 rounded-lg shadow-lg overflow-hidden border rounded-sm">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-white font-semibold"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

    
      {mobileSearchOpened && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col md:hidden">
          
          <div className="flex items-center p-4 border-b border-neutral-800">
            <button
              onClick={closeMobileSearch}
              className="mr-4"
            >
              <img
                src="/close.svg"
                alt="Cerrar"
                className="filter invert-[100%]"
                width={24}
                height={24}
              />
            </button>
            
            <div className="flex-1 flex items-center bg-neutral-800 rounded-full px-4 py-3">
              <img
                src="/search.svg"
                alt="Search"
                width={20}
                height={20}
                className="filter invert-[70%] mr-3"
              />
              <input
                type="text"
                className="flex-1 bg-transparent text-white text-lg outline-none border-none"
                placeholder="¿Qué quieres reproducir?"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleMobileSearch}
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2"
                >
                  <img
                    src="/close.svg"
                    alt="Limpiar"
                    className="filter invert-[70%]"
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </div>
          </div>

        
        </div>
      )}

    
      <div className="fixed bottom-0 left-0 w-full bg-black p-3 md:hidden border-t border-neutral-800">
        <div className="flex justify-center">
          <button
            onClick={openMobileSearch}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <img
              src="/search.svg"
              alt="Buscar"
              width={20}
              height={20}
              className="filter invert-[70%]"
            />
          </button>
        </div>
      </div>
    </>
  );
}