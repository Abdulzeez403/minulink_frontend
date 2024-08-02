"use client"
import React, { useEffect, useState } from 'react';
import MlButton from './components/button';
import { MdLogin } from "react-icons/md";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaArrowAltCircleRight, FaLink } from 'react-icons/fa';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useApi } from './context';



interface Session {
    isUserAuthenticated: boolean;
}

const HomeLayout: React.FC<Session> = ({ isUserAuthenticated }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const { createUrl, getUrlsByUserId } = useApi();
    const { user } = useKindeBrowserClient();
    const [userId, setUserId] = useState<string | null>(null);


    useEffect(() => {
        // Fetch user ID from Kinde and set it
        if (user) {
            setUserId(user.id);
            console.log(user.id, "userId")
        }
    }, [user]);
    const handleCreateUrl = (values: any) => {
        const payload = {
            originalUrl, userId
        }
        console.log(payload)
        createUrl(payload as any)
        getUrlsByUserId(userId)


    }

    return (
        <div>
            <div className="flex justify-between items-center px-10 pt-10">
                <h3 className='text-gradient font-bold text-[1.3rem]'>MinuLink</h3>
                {
                    isUserAuthenticated ? (
                        <div className="hidden md:flex  lg:flex justify-center items-center pt-4">
                            <div className="border-2 rounded-full pl-4 bg-black">
                                <div className="flex justify-between">
                                    <div className="flex justify-center items-center">
                                        <div className="p-4">
                                            <FaLink color='white' size={25} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder='Enter your link'
                                            value={originalUrl}
                                            onChange={(e) => setOriginalUrl(e.target.value)}
                                            className='bg-black py-3 outline-none placeholder:text-slate-200 text-white md:w-96 lg:w-96 rounded-full'
                                        />
                                    </div>
                                    <MlButton
                                        icon={<FaArrowAltCircleRight />}
                                        className="bg-[#144ee3] border-0 m-1"
                                        onClick={handleCreateUrl}
                                    // disabled={isLoading}
                                    >
                                        <h4 className='hidden md:flex lg:flex'>
                                            {/* {isLoading ? 'Shortening...' : 'Shorten Now!'} */}

                                            Shorten Now!
                                        </h4>
                                    </MlButton>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <div className="pl-4 flex space-x-4">
                    {isUserAuthenticated ? (
                        <MlButton className='bg-[#144EE3] border-none hidden md:flex lg:flex'>
                            <LogoutLink>{user?.family_name}</LogoutLink>
                        </MlButton>

                    ) : (
                        <div className="pl-4 flex space-x-4">

                            <div>
                                <MlButton icon={<MdLogin />} className="border-2 border-[#C9CED6]">
                                    <h4>
                                        <LoginLink>Login</LoginLink>
                                    </h4>
                                </MlButton>
                            </div>

                            <MlButton className='bg-[#144EE3] border-none hidden md:flex lg:flex'>
                                <RegisterLink>Register Now</RegisterLink>
                            </MlButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
