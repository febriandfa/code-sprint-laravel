import React from 'react';

interface ChecklistProps {
    items: string[];
}

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <svg
                        className="h-6 w-6 flex-shrink-0 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base leading-relaxed text-gray-800">{item}</span>
                </li>
            ))}
        </ul>
    );
};

export default Checklist;
