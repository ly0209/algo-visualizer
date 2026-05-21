import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import CustomCode from "./pages/CustomCode";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:algorithmId" element={<Player />} />
        <Route path="/custom" element={<CustomCode />} />
      </Routes>
    </div>
  );
}

export default App;
