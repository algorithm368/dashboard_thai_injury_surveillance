// ...existing code...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewsPage from "./pages/OverViews/OverViewsPage";
import Navbar from "./layouts/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pb-4 sm:pb-6">
          <Routes>
            <Route
              path="/projects/dashboard/injury/2024"
              element={<OverviewsPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
