import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewsPage from "./pages/OverViews/OverViewsPage";
import TestPages from "./pages/Tests/TestPages";
import Navbar from "./layouts/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pb-4 sm:pb-6">
          <Routes>
            <Route path="/" element={<OverviewsPage />} />
            <Route path="/tests" element={<TestPages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
