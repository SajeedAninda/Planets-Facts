import { useState } from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    const [selectedPlanet, setSelectedPlanet] = useState("Earth");
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
    const selectedColor = colors[selectedPlanet] || "#6d2ed5";

    return (
        <>
            <Navbar onPlanetChange={setSelectedPlanet} />
            <Home selectedPlanet={selectedPlanet} buttonColor={selectedColor} />
        </>
    );
}

export default App;
