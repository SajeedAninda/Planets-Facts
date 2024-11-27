import React, { useEffect, useState } from "react";
import hamburgerIcon from "../../../public/assets/icon-hamburger.svg";

const Navbar = ({ onPlanetChange }) => {
    const [items, setItems] = useState([]);
    const [activePlanet, setActivePlanet] = useState("Earth");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((json) => setItems(json))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const colors = {
        Mercury: '#419ebb',
        Venus: '#eda249',
        Earth: '#6d2ed5',
        Mars: '#d14c32',
        Jupiter: '#d83a34',
        Saturn: '#cd5120',
        Uranus: '#1ec1a2',
        Neptune: '#2d68f0',
    };

    const handlePlanetClick = (planet) => {
        setActivePlanet(planet);
        onPlanetChange(planet);
        setIsSidebarOpen(false); 
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="bg-[#070724] h-[14vh] flex items-center">
            <div className="w-[85%] lg:w-[95%] mx-auto flex justify-between items-center">
                <div className="logo">
                    <p className="text-[28px] text-white font-antonio font-semibold">
                        THE PLANETS
                    </p>
                </div>

                <div className="menu hidden lg:flex gap-4">
                    {items?.map((item) => (
                        <div
                            key={item.name}
                            className={`relative group flex-1 text-center uppercase font-spartan text-[13px] font-bold tracking-wider cursor-pointer h-full p-6 transition-all duration-75 ease-in-out ${activePlanet === item.name
                                    ? "text-white"
                                    : "text-[#bfc2c7]"
                                }`}
                            onClick={() => handlePlanetClick(item.name)}
                            style={{
                                borderBottom: activePlanet === item.name
                                    ? `5px solid ${colors[item.name] || '#bfc2c7'}`
                                    : "none",
                            }}
                        >
                            <span
                                className="absolute left-0 right-0 top-0 h-1 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                                style={{
                                    backgroundColor: colors[item.name] || '#bfc2c7',
                                }}
                            ></span>
                            {item.name}
                        </div>
                    ))}
                </div>

                <div className="hamburgerIcon lg:hidden">
                    <img src={hamburgerIcon} alt="Menu" onClick={toggleSidebar} />
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 h-screen w-3/4 bg-[#070724] z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col px-8 py-6 space-y-8">
                    {items?.map((item) => (
                        <div
                            key={item.name}
                            className={`text-white uppercase font-spartan text-[16px] font-bold tracking-wide cursor-pointer ${activePlanet === item.name ? "text-white" : "text-[#bfc2c7]"
                                }`}
                            onClick={() => handlePlanetClick(item.name)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
        </div>
    );
};

export default Navbar;
