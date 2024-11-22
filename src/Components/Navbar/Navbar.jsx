import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((json) => setItems(json))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='bg-[#070724] h-[13vh] border-b border-gray-400 flex items-center'>
            <div className='w-[95%] mx-auto flex justify-between items-center'>
                <div className="logo">
                    <p className='text-[28px] text-white font-antonio font-semibold'>
                        THE PLANETS
                    </p>
                </div>

                <div className="menu flex gap-16">
                    {items?.map((item) => (
                        <div key={item.name} className="menu-item uppercase font-spartan text-[13px] text-[#bfc2c7] font-bold tracking-wider cursor-pointer hover:text-white transition duration-75 ease-in-out">
                            {item?.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
