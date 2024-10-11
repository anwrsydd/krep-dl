"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(true);
    const barClicked = function (): void {
        if (dropdown) {
            setIsExiting(true);
            setTimeout(() => {
                setDropdown(false);
            }, 150);
        } else {
            setIsExiting(false);
            setTimeout(() => {
                setDropdown(true);
            }, 150);
        }
    };
    return (
        <>
            <header className="z-[1000] shadow-xl relative top-0 sticky">
                <div className="p-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600">
                    <div className="flex">
                        <h1 className="ml-3 font-semibold text-xl text-gray-300 flex-1">
                            KrepDL
                        </h1>
                        <div className="relative absolute right-4">
                            <button onClick={() => barClicked()}>
                                <FontAwesomeIcon
                                    icon={!isExiting ? faXmark : faBars}
                                    className="text-white/80"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {dropdown && (
                    <div
                        className={`bg-slate-100 right-0 rounded-bl-md p-3 absolute shadow-xl ${
                            isExiting ? "animate-fadeOut" : "animate-fadeIn"
                        }`}
                    >
                        <ul>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/">Source Code</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
}
