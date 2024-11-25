import { useState } from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    const [selectedPlanet, setSelectedPlanet] = useState("Earth");
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
    const selectedColor = colors[selectedPlanet] || "#6d2ed5";

    return (
        <>
            <Navbar onPlanetChange={setSelectedPlanet} />
            <Home selectedPlanet={selectedPlanet} buttonColor={selectedColor} />
        </>
    );
}

export default App;
