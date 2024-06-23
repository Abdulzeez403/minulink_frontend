// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const MlButton: React.FC<ButtonProps> = ({ icon, children, className = '', ...props }) => {
    return (
        <button
            className={`flex items-center justify-center px-6 py-2 border border-white text-md font-medium rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
            {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default MlButton;
