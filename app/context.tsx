"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { notify } from './components/toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// Define the shape of the API context state

interface IUrlProps {
    url: string,
    userId: any
}
interface ApiContextState {
    userId: string | null;
    urls: string[];
    getUrlsByUserId: (userId: any) => void;
    createUrl: (values: IUrlProps) => Promise<void>;
    updateUrl: (shortUrl: string, newUrl: string) => Promise<void>;
    deleteUrl: (shortUrl: string) => Promise<void>;
    error: string | null;
}

// Create a context with a default value
const ApiContext = createContext<ApiContextState | undefined>(undefined);

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};

interface ApiProviderProps {
    children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [urls, setUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useKindeBrowserClient(); // Assuming `user` has user ID

    useEffect(() => {
        // Fetch user ID from Kinde and set it
        if (user) {
            setUserId(user.id);
            console.log(user.id, "userId")
        }
    }, [user]);

    const getUrlsByUserId = async (userId: any) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/${userId}`);
            setUrls(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const createUrl = async (values: IUrlProps) => {
        if (!userId) {
            notify.error('User not authenticated');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/shorten`, values);
            notify.success('URL created successfully');
        } catch (error: any) {
            notify.error(error.response.data.message)
            throw Error;
        }
    };

    const updateUrl = async (shortUrl: string, newUrl: string) => {
        try {
            const response = await axios.put(`/api/urls/${shortUrl}`, { originalUrl: newUrl });
            notify.success(response.data.message || 'URL updated successfully');

        } catch (error: any) {
            notify.error(error.response.data.message)
        }
    };

    const deleteUrl = async (shortUrl: string) => {
        try {
            const response = await axios.delete(`/api/urls/${shortUrl}`);
            notify.success(response.data.message || 'URL deleted successfully');

        } catch (error: any) {
            notify.error(error.response.data.message)

        }
    };

    return (
        <ApiContext.Provider
            value={{ userId, urls, getUrlsByUserId, createUrl, updateUrl, deleteUrl, error }}
        >
            {children}
        </ApiContext.Provider>
    );
};
