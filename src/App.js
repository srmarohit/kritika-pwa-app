import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./pages/Question";
import Home from "./pages/Home";
import Gift from "./pages/Gift";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/anstoquestion" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
