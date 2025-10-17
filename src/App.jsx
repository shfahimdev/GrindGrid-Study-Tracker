import React, { useState, useEffect } from "react";
import Tracker from "./Tracker";

function App() {
    const [activeSection, setActiveSection] = useState("home");

    return (
        <Tracker />
    );
}

export default App;
