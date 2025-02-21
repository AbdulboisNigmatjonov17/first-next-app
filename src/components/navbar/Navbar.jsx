"use client";

import { useState, useEffect } from "react";
import { auth, signInWithGoogle, logOut } from "../../../firebase";
import { NotificationsOutlined, Search, VideoCallOutlined, YouTube, PersonOutline } from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        setIsLogoutModalOpen(false);
        await logOut();
    };

    return (
        <nav className="h-[7dvh] px-5 flex justify-between items-center relative">
            <Link href={"/"}>
                <div className="flex text-red-600 items-center cursor-pointer">
                    <YouTube fontSize="large" />
                    <h3 className="text-black text-[22px]">YouTube</h3>
                </div>
            </Link>

            <form className="w-[600px] border border-black rounded-[100px] pl-5 h-[50px] flex">
                <input type="text" placeholder="Search" className="outline-none h-full w-full" />
                <button type="submit" className="w-[100px] border border-l-black rounded-r-[100px] hover:bg-black hover:text-white">
                    <Search />
                </button>
            </form>

            <div className="flex gap-5 items-center relative">
                <VideoCallOutlined fontSize="large" className="cursor-pointer" />
                <NotificationsOutlined fontSize="large" className="cursor-pointer" />

                {user ? (
                    <div className="relative">
                        {user.photoURL ? (
                            <img
                                src={`${user.photoURL}`}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer border"
                                onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
                            />
                        ) : (
                            <PersonOutline
                                fontSize="large"
                                className="cursor-pointer text-gray-600"
                                onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
                            />
                        )}

                        {isLogoutModalOpen && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-3 min-w-[180px] border z-50">
                                <p className="text-center text-gray-700 font-semibold">{user.displayName || "User"}</p>
                                <p className="text-center text-gray-600 text-sm">{user.email}</p>
                                <button
                                    onClick={handleLogout}
                                    className="mt-3 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-md"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={signInWithGoogle} className="bg-blue-500 px-4 py-2 text-white rounded">
                        Sign In
                    </button>
                )}
            </div>

            {isLogoutModalOpen && (
                <div
                    className="fixed inset-0"
                    onClick={() => setIsLogoutModalOpen(false)}
                />
            )}
        </nav>
    );
}
