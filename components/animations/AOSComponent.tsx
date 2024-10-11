"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSComonent({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000,
        });
    });
    return children;
}
