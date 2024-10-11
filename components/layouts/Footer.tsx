"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto p-4">
                <p className="text-center">
                    &copy; {new Date().getFullYear()} KrepDL
                </p>
            </div>
        </footer>
    );
}
