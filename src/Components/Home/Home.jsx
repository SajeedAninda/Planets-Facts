import React, { useEffect, useState } from 'react';
import "./home.css";
import sourceIcon from "../../assets/icon-source.svg";

const Home = () => {
    const [earthData, setEarthData] = useState(null);
    const [activeButton, setActiveButton] = useState("overview");
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const earth = data.find(planet => planet.name === "Earth");
                setEarthData(earth);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getActiveContent = () => {
        if (!earthData) return {};

        switch (activeButton) {
            case "overview":
                return {
                    text: earthData.overview.content,
                    source: earthData.overview.source,
                    image: earthData.images.planet,
                    overlayImage: null,
                };
            case "internal":
                return {
                    text: earthData.structure.content,
                    source: earthData.structure.source,
                    image: earthData.images.internal,
                    overlayImage: null,
                };
            case "geology":
                return {
                    text: earthData.geology.content,
                    source: earthData.geology.source,
                    image: earthData.images.planet,
                    overlayImage: earthData.images.geology,
                };
            default:
                return {};
        }
    };

    const { text, source, image, overlayImage } = getActiveContent();

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
        setAnimationKey((prevKey) => prevKey + 1);
    };

    return (
        <div className='h-fit bg-[#070724] homebg py-20'>
            <div className='w-[80%] mx-auto'>
                {earthData ? (
                    <div>
                        <div className='topDiv flex gap-6'>
                            <div className='relative imgDiv w-[65%] px-10'>
                                <img
                                    src={image}
                                    alt="Earth"
                                    key={`${image}-${animationKey}`}
                                    className="w-[80%] mx-auto animate-fade-scale"
                                />
                                {overlayImage && (
                                    <img
                                        src={overlayImage}
                                        alt="Geology Overlay"
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150px] "
                                    />
                                )}
                            </div>

                            <div className='textDiv w-[35%] text-white'>
                                <h1 className='text-[80px] font-antonio uppercase mb-4'>{earthData.name}</h1>
                                <p className='font-spartan leading-7 text-[#bfc2c7] font-semibold mb-4'>{text}</p>
                                <span className='flex gap-2 items-center text-gray-500 font-semibold mb-4'>
                                    <p>Source:</p>
                                    <a
                                        href={source}
                                        className='font-bold underline text-gray-400 flex gap-1 items-center'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Wikipedia
                                        <img src={sourceIcon} alt="" />
                                    </a>
                                </span>

                                <div className="menus font-antonio mt-6">
                                    <button
                                        onClick={() => handleButtonClick("overview")}
                                        className={`py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500 ${activeButton === "overview"
                                            ? "bg-[#6d2ed5] text-white border-none"
                                            : "bg-transparent border-gray-500 hover:bg-gray-800"
                                            }`}
                                    >
                                        <p className='text-gray-400 tracking-widest font-bold'>01</p>
                                        <p className='text-white text-[18px] uppercase tracking-widest font-bold'>Overview</p>
                                    </button>

                                    <button
                                        onClick={() => handleButtonClick("internal")}
                                        className={`py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500 ${activeButton === "internal"
                                            ? "bg-[#6d2ed5] text-white border-none"
                                            : "bg-transparent border-gray-500 hover:bg-gray-800"
                                            }`}
                                    >
                                        <p className='text-gray-400 tracking-widest font-bold'>02</p>
                                        <p className='text-white text-[18px] uppercase tracking-widest font-bold'>Internal Structure</p>
                                    </button>

                                    <button
                                        onClick={() => handleButtonClick("geology")}
                                        className={`py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500 ${activeButton === "geology"
                                            ? "bg-[#6d2ed5] text-white border-none"
                                            : "bg-transparent border-gray-500 hover:bg-gray-800"
                                            }`}
                                    >
                                        <p className='text-gray-400 tracking-widest font-bold'>03</p>
                                        <p className='text-white text-[18px] uppercase tracking-widest font-bold'>Surface Geology</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bottomDiv mt-12 grid grid-cols-1 lg:grid-cols-4 font-antonio gap-8">
                            <div className='border border-gray-500 p-6'>
                                <p className='text-gray-400 tracking-wide uppercase font-bold'>
                                    Rotation Time
                                </p>
                                <p className='text-white mt-2 text-[40px] uppercase tracking-wide font-bold'>
                                    {earthData?.rotation ?
                                        `${Math.round(parseFloat(earthData.rotation))} ${earthData.rotation.replace(/[\d.]+/, '').trim()}`
                                        : ''}
                                </p>
                            </div>

                            <div className='border border-gray-500 p-6'>
                                <p className='text-gray-400 tracking-wide uppercase font-bold'>
                                Revolution Time
                                </p>
                                <p className='text-white mt-2 text-[40px] uppercase tracking-wide font-bold'>
                                    {earthData?.revolution ?
                                        `${Math.round(parseFloat(earthData.revolution))} ${earthData.revolution.replace(/[\d.]+/, '').trim()}`
                                        : ''}
                                </p>
                            </div>

                            <div className='border border-gray-500 p-6'>
                                <p className='text-gray-400 tracking-wide uppercase font-bold'>
                                Radius
                                </p>
                                <p className='text-white mt-2 text-[40px] uppercase tracking-wide font-bold'>
                                    {earthData?.radius}
                                </p>
                            </div>

                            <div className='border border-gray-500 p-6'>
                                <p className='text-gray-400 tracking-wide uppercase font-bold'>
                                Average Temp
                                </p>
                                <p className='text-white mt-2 text-[40px] uppercase tracking-wide font-bold'>
                                    {earthData?.temperature}
                                </p>
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
