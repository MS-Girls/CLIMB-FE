import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="h-screen w-64 bg-primary text-text flex flex-col justify-between">
            <div className="mt-10">
                <h1 className="text-2xl font-bold text-center mb-10">Features</h1>
                <ul className="space-y-4">
                    <li className="px-4 py-2 hover:bg-secondary-200 cursor-pointer">Resume Correction</li>
                    <li className="px-4 py-2 hover:bg-secondary-200 cursor-pointer">Job Searching</li>
                    <li className="px-4 py-2 hover:bg-secondary-200 cursor-pointer">Cover Letter Generation</li>
                    <li className="px-4 py-2 hover:bg-secondary-200 cursor-pointer">Interview Questions</li>
                    <li className="px-4 py-2 hover:bg-secondary-200 cursor-pointer">OA Practice</li>
                </ul>
            </div>
            <div className="mb-10 text-center">
                <p className="text-sm">© 2023 CLIMB</p>
            </div>
        </div>
    );
};

export default Sidebar;