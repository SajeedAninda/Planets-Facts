import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

function App() {
    const [selectedPlanet, setSelectedPlanet] = useState("Earth");

    return (
        <>
            <Navbar onPlanetChange={setSelectedPlanet} />
            <Home selectedPlanet={selectedPlanet} />
        </>
    );
}

export default App;
