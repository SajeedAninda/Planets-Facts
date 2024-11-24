import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((json) => setItems(json))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const colors = {
        Mercury: '#58a6ff',
        Venus: '#ffac3b',
        Earth: '#6d2ed5',
        Mars: '#ff6a3b',
        Jupiter: '#e57300',
        Saturn: '#ffbf47',
        Uranus: '#50d7c2',
        Neptune: '#3b89ff',
    };

    return (
        <div className="bg-[#070724] h-[14vh] flex items-center">
            <div className="w-[95%] mx-auto flex justify-between items-center">
                <div className="logo">
                    <p className="text-[28px] text-white font-antonio font-semibold">
                        THE PLANETS
                    </p>
                </div>

                <div className="menu flex gap-4">
                    {items?.map((item) => (
                        <div
                            key={item.name}
                            className="relative group flex-1 text-center uppercase font-spartan text-[13px] text-[#bfc2c7] font-bold tracking-wider cursor-pointer transition duration-75 ease-in-out h-full p-6"
                        >
                            <div
                                className="absolute inset-x-0 -top-2 h-[5px] w-0 bg-transparent group-hover:w-full group-hover:bg-current transition-all duration-300 ease-in-out"
                                style={{
                                    backgroundColor: colors[item.name] || '#bfc2c7',
                                }}
                            ></div>

                            <span className="relative z-10 group-hover:text-white">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Navbar;
