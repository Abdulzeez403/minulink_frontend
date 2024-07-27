"use client"
import React, { useState } from 'react';
import MlButton from '../components/button';
import { FaLink } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useApi } from '../context';

interface HomeIProps {
    isUserAuthenticated: boolean;
}

const HomePage: React.FC<HomeIProps> = ({ isUserAuthenticated }) => {

    const [originalUrl, setOriginalUrl] = useState('');
    const { createUrl } = useApi();
    const handleCreateUrl = (value: any) => {
        createUrl(value)

    }


    return (
        <div>

            {!isUserAuthenticated ? (
                <div>

                    <div className="flex justify-center items-center pt-10 md:pt-40 lg:pt-40">
                        <div>
                            <h1 className="text-[3rem] text-gradient animate-gradient-bg bg-gradient-to-r text-center font-extrabold md:text-[5rem] lg:text-[5rem]">
                                Shorten Your Loooong Link :)
                            </h1>
                            <div className="flex justify-center items-center">
                                <p className="text-[#C9CED6] font-light text-center text-md md:w-[60%] lg:w-[60%]">
                                    MuniLink is an efficient and easy-to-use URL shortening service that streamlines your online experience
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center pt-10">
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
                                        className='bg-black py-4 outline-none placeholder:text-white text-white md:w-96 lg:w-96 rounded-full'
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

                    {/* Auto Paste and Registration Reminder */}
                    <div>
                        <div className='flex justify-center items-center my-3'>
                            <div className='flex items-center'>
                                <Switch className="custom-switch" />
                                <p className='text-[#C9CED6] font-light py-2 text-center pl-5'>
                                    Auto Paste from Clipboard
                                </p>
                            </div>
                        </div>
                        <h4 className='text-[#C9CED6] font-light text-center'>
                            You can create <span className='text-red-400'>05</span> more links. Register Now to enjoy unlimited usage
                        </h4>
                    </div>
                </div>) : null}


        </div>

    );
}

export default HomePage;
