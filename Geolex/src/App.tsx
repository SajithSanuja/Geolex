import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar enableShrinking={false} />
      <Home />
    </div>
  );
}

export default App;
