import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Create from "./pages/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
