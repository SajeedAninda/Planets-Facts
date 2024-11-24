import React, { useEffect, useState } from 'react';
import "./home.css";
import sourceIcon from "../../assets/icon-source.svg";

const Home = () => {
    const [earthData, setEarthData] = useState(null);

    useEffect(() => {
        // Fetch data from the public folder
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                // Filter Earth data
                const earth = data.find(planet => planet.name === "Earth");
                setEarthData(earth);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='h-fit bg-[#070724] homebg py-20'>
            <div className='w-[80%] mx-auto'>
                {earthData ? (
                    <div className='flex'>
                        <div className='imgDiv w-[65%] px-10'>
                            <img src={earthData.images.planet} alt="Earth" />
                        </div>


                        <div className='textDiv w-[35%] text-white'>
                            <h1 className='text-[80px] font-antonio uppercase mb-4'>{earthData.name}</h1>
                            <p className='font-spartan leading-7 text-[#bfc2c7] font-semibold  mb-4'>{earthData.overview.content}</p>
                            <span className='flex gap-2 items-center text-gray-500 font-semibold  mb-4'>
                                <p>Source:</p>
                                <a href={earthData.overview.source}
                                    className='font-bold underline text-gray-400 flex gap-1 items-center'
                                    target="_blank">
                                    Wikipedia
                                    <img src={sourceIcon} alt="" />
                                </a>
                            </span>

                            <div className="menus font-antonio mt-4">
                                <button className='py-4 px-8 flex gap-8 items-center bg-transparent border border-gray-500 w-full mb-2'>
                                    <p className='text-gray-400 tracking-widest font-bold'>
                                        01
                                    </p>
                                    <p className='text-white text-[20px] tracking-widest font-bold'>
                                        Overview
                                    </p>
                                </button>

                                <button className='py-4 px-8 flex gap-8 items-center bg-transparent border border-gray-500 w-full mb-2'>
                                    <p className='text-gray-400 tracking-widest font-bold'>
                                        01
                                    </p>
                                    <p className='text-white text-[20px] tracking-widest font-bold'>
                                        Overview
                                    </p>
                                </button>

                                <button className='py-4 px-8 flex gap-8 items-center bg-transparent border border-gray-500 w-full mb-2'>
                                    <p className='text-gray-400 tracking-widest font-bold'>
                                        01
                                    </p>
                                    <p className='text-white text-[20px] tracking-widest font-bold'>
                                        Overview
                                    </p>
                                </button>
                            </div>
                        </div>


                    </div>
                ) : (
                    <p className="text-white text-center">Loading Earth data...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
