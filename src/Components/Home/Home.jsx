import React, { useEffect, useState } from 'react';
import './home.css';
import sourceIcon from '../../assets/icon-source.svg';

const Home = ({ selectedPlanet, buttonColor }) => {
    const [planetData, setPlanetData] = useState(null);
    const [activeButton, setActiveButton] = useState('overview');
    const [animationKey, setAnimationKey] = useState(0);

    console.log(buttonColor);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                const planet = data.find((item) => item.name === selectedPlanet);
                setPlanetData(planet);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [selectedPlanet]);

    const getActiveContent = () => {
        if (!planetData) return {};

        switch (activeButton) {
            case 'overview':
                return {
                    text: planetData.overview.content,
                    source: planetData.overview.source,
                    image: planetData.images.planet,
                    overlayImage: null,
                };
            case 'internal':
                return {
                    text: planetData.structure.content,
                    source: planetData.structure.source,
                    image: planetData.images.internal,
                    overlayImage: null,
                };
            case 'geology':
                return {
                    text: planetData.geology.content,
                    source: planetData.geology.source,
                    image: planetData.images.planet,
                    overlayImage: planetData.images.geology,
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
        <div className="h-fit bg-[#070724] homebg py-20">
            <div className="w-[80%] mx-auto">
                {planetData ? (
                    <div>
                        <div className="topDiv flex gap-6">
                            <div className="relative imgDiv w-[65%] px-10">
                                <img
                                    src={image}
                                    alt={planetData.name}
                                    key={`${image}-${animationKey}`}
                                    className="w-[80%] mx-auto animate-fade-scale"
                                />
                                {overlayImage && (
                                    <img
                                        src={overlayImage}
                                        alt="Geology Overlay"
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150px]"
                                    />
                                )}
                            </div>

                            <div className="textDiv w-[35%] text-white">
                                <h1 className="text-[80px] font-antonio uppercase mb-4">{planetData.name}</h1>
                                <p className="font-spartan leading-7 text-[#bfc2c7] font-semibold mb-4">{text}</p>
                                <span className="flex gap-2 items-center text-gray-500 font-semibold mb-4">
                                    <p>Source:</p>
                                    <a
                                        href={source}
                                        className="font-bold underline text-gray-400 flex gap-1 items-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Wikipedia
                                        <img src={sourceIcon} alt="" />
                                    </a>
                                </span>

                                <div className="menus font-antonio mt-6">
                                    <button
                                        onClick={() => handleButtonClick('overview')}
                                        className="py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500"
                                        style={{
                                            backgroundColor: activeButton === 'overview' ? buttonColor : 'transparent',
                                            border: activeButton === 'overview' ? 'none' : '1px solid #gray',
                                        }}
                                    >
                                        <p className="text-gray-400 tracking-widest font-bold">01</p>
                                        <p className="text-white text-[18px] uppercase tracking-widest font-bold">Overview</p>
                                    </button>

                                    <button
                                        onClick={() => handleButtonClick('internal')}
                                        className="py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500"
                                        style={{
                                            backgroundColor: activeButton === 'internal' ? buttonColor : 'transparent',
                                            border: activeButton === 'internal' ? 'none' : '1px solid #gray',
                                        }}
                                    >
                                        <p className="text-gray-400 tracking-widest font-bold">02</p>
                                        <p className="text-white text-[18px] uppercase tracking-widest font-bold">Internal Structure</p>
                                    </button>

                                    <button
                                        onClick={() => handleButtonClick('geology')}
                                        className="py-3 px-8 flex gap-8 items-center border w-full mb-4 cursor-pointer hover:scale-105 transition duration-500"
                                        style={{
                                            backgroundColor: activeButton === 'geology' ? buttonColor : 'transparent',
                                            border: activeButton === 'geology' ? 'none' : '1px solid #gray',
                                        }}
                                    >
                                        <p className="text-gray-400 tracking-widest font-bold">03</p>
                                        <p className="text-white text-[18px] uppercase tracking-widest font-bold">Surface Geology</p>
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="bottomDiv mt-12 grid grid-cols-1 lg:grid-cols-4 font-antonio gap-8">
                            <div className="border border-gray-500 p-6">
                                <p className="text-gray-400 tracking-wide uppercase font-bold">Rotation Time</p>
                                <p className="text-white mt-2 text-[40px] uppercase tracking-wide font-bold">
                                    {planetData.rotation}
                                </p>
                            </div>

                            <div className="border border-gray-500 p-6">
                                <p className="text-gray-400 tracking-wide uppercase font-bold">Revolution Time</p>
                                <p className="text-white mt-2 text-[40px] uppercase tracking-wide font-bold">
                                    {planetData.revolution}
                                </p>
                            </div>

                            <div className="border border-gray-500 p-6">
                                <p className="text-gray-400 tracking-wide uppercase font-bold">Radius</p>
                                <p className="text-white mt-2 text-[40px] uppercase tracking-wide font-bold">
                                    {planetData.radius}
                                </p>
                            </div>

                            <div className="border border-gray-500 p-6">
                                <p className="text-gray-400 tracking-wide uppercase font-bold">Average Temp</p>
                                <p className="text-white mt-2 text-[40px] uppercase tracking-wide font-bold">
                                    {planetData.temperature}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-white text-center">Loading planet data...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
