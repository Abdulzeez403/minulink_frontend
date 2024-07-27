"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { notify } from './components/toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// Define the shape of the API context state
interface ApiContextState {
    userId: string | null;
    urls: string[];
    fetchUrls: () => void;
    createUrl: (url: string) => Promise<void>;
    updateUrl: (shortUrl: string, newUrl: string) => Promise<void>;
    deleteUrl: (shortUrl: string) => Promise<void>;
    error: string | null;
}

// Create a context with a default value
const ApiContext = createContext<ApiContextState | undefined>(undefined);

// Error handling function
const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        // Axios error
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
            notify.error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Network Error:', error.request);
            notify.error('Network error occurred. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            notify.error('An error occurred. Please try again.');
        }
    } else {
        // Non-Axios error
        console.error('Error:', error);
        notify.error('An unknown error occurred. Please try again.');
    }
};

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
    const port = process.env.BACKEND_API || '';

    useEffect(() => {
        // Fetch user ID from Kinde and set it
        if (user) {
            setUserId(user.id); // Adjust according to the actual user object structure
        }
    }, [user]);

    const fetchUrls = async () => {
        try {
            const response = await axios.get('/api/urls');
            setUrls(response.data);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const createUrl = async (url: string) => {
        if (!userId) {
            notify.error('User not authenticated');
            return;
        }
        try {
            const response = await axios.post(`${port}/api/shorten`, { originalUrl: url, userId });
            notify.success('URL created successfully');
            await fetchUrls(); // Refresh URL list
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const updateUrl = async (shortUrl: string, newUrl: string) => {
        try {
            const response = await axios.put(`/api/urls/${shortUrl}`, { originalUrl: newUrl });
            notify.success(response.data.message || 'URL updated successfully');
            await fetchUrls(); // Refresh URL list
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deleteUrl = async (shortUrl: string) => {
        try {
            const response = await axios.delete(`/api/urls/${shortUrl}`);
            notify.success(response.data.message || 'URL deleted successfully');
            await fetchUrls(); // Refresh URL list
        } catch (error) {
            handleAxiosError(error);
        }
    };

    return (
        <ApiContext.Provider
            value={{ userId, urls, fetchUrls, createUrl, updateUrl, deleteUrl, error }}
        >
            {children}
        </ApiContext.Provider>
    );
};
