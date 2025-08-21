"use client"
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Mainn from "@components/Mainn";

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
         <div className="flex flex-col h-screen bg-black">
            <Navbar onSearchChange={handleSearchChange} />
            <div className="flex h-screen p-2 gap-2 bg-black overflow-hidden">
                <Sidebar />
                <Mainn searchTerm={searchTerm} />
            </div>
            </div>
        </>
    );
}