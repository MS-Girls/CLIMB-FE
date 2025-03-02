"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('');
    
    const handleNavigation = (path:any, itemName:any) => {
        setActiveItem(itemName);
        router.push(path);
    };
    
    const menuItems = [
        { name: 'Resume Correction', path: '/resume' },
        { name: 'Job Searching', path: '/JobSearching' },
        { name: 'Cover Letter Generation', path: '/CoverLetter' },
        { name: 'Interview Questions', path: '/InterviewQuestions' },
        { name: 'OA Practice', path: '/OARound' }
    ];

    return (
        <div className="h-screen w-64 bg-primary text-text flex flex-col justify-between overflow-y-auto z-10">
            <div className="mt-10">
                <h1 className="text-2xl font-bold text-center mb-10">Features</h1>
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li 
                            key={item.name}
                            className={`px-4 py-2 hover:bg-secondary-200 cursor-pointer transition-colors duration-200 ${activeItem === item.name ? 'bg-secondary-200' : ''}`}
                            onClick={() => handleNavigation(item.path, item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-10 text-center">
                <p className="text-sm">© 2023 CLIMB</p>
            </div>
        </div>
    );
};

export default Sidebar;