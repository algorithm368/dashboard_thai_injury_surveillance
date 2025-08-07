/**
 * StrictMode is a special wrapper from React.
 * It doesn't render any UI but helps highlight potential problems in
 * an application, during development.
 */
import { StrictMode } from "react";

/**
 * This import the `createRoot` function funtion, which is the modern
 * way to render a React apps starting with React 18.
 * It replaces the older `ReactDOM.render` method.
 */
import { createRoot } from "react-dom/client";

/**
 * This imports the main App component of the application.
 * The App component is the root component that contains the entire
 * application structure and logic.
 */
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
