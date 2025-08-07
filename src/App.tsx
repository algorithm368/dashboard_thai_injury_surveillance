/**
 * Hey computer! Please bring in React.
 * It's the box of LEGO we use to build websites.
 */
import React from "react";

/**
 * Now, let's also bring in a map helper from a library called 'react-router-dom'.
 * It helps us drive (or route) to different pages on the website.
 *  - "BrowserRouter" (we renamed it Router) is the tool that watches the address bar.
 *  - "Routes" is like a list of directions for the computer.
 *  - "Route" tells the computer: "When the address is ___, show this page.""
 *
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * Let's bring in our OverviewsPage component.
 * This is the page we want to show when someone visits the home address ("/").
 */
import OverviewsPage from "./pages/OverViews/OverViewsPage";

/**
 * Let's bring in our TestPages component.
 * This is the page we want to show when someone visits the tests address ("/tests").
 */
import TestPages from "./pages/Tests/TestPages";

/**
 * This is our main app - the boss that say what to show on the screen.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OverviewsPage />} />
        <Route path="/tests" element={<TestPages />} />
      </Routes>
    </Router>
  );
}

export default App;
