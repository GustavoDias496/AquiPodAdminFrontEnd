import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Visuazer } from "../pages/Visualizer/Visualizer";
import { About } from "../pages/About/About";

export function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/visualizer" element={<Visuazer/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
  );
}
