import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Syllabus from "./pages/Syllabus";
import Reflection from "./pages/Reflection";
import Stats from "./pages/Stats";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="syllabus" element={<Syllabus />} />
                <Route path="reflection" element={<Reflection />} />
                <Route path="stats" element={<Stats />} />
            </Route>
        </Routes>
    );
}

export default App;
