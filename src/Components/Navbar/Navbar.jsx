import React, { useEffect, useState } from "react";
import hamburgerIcon from "../../assets/icon-hamburger.svg";

const Navbar = ({ onPlanetChange }) => {
    const [items, setItems] = useState([]);
    const [activePlanet, setActivePlanet] = useState("Earth");

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
    };

    return (
        <div className="bg-[#070724] h-[14vh] flex items-center">
            <div className="w-[95%] lg:w-[90%] mx-auto flex justify-between items-center">
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
                            {item.name}
                        </div>
                    ))}
                </div>

                <div className="hamburgerIcon lg:hidden">
                    <img src={hamburgerIcon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
