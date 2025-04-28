import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageGen from "./component/ImageGen";
import ChatResponse from "./component/ChatResponse";
import Translator from "./component/Translator";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./component/LandingPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/imagegen" element={<ImageGen />} />
            <Route path="/chat-res" element={<ChatResponse />} />
            <Route path="/translate" element={<Translator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;