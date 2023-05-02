import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../src/pages/Login/Login";
import { Dashboard } from "../src/pages/Dashboard/Dashboard";
import { Recovery } from "../src/pages/Recovery/Recovery";
import { Register } from "../src/pages/Register/Register";
import { GlobalProvider } from "../src/store/context";

const VITE_GOOGLE_ID =
  "540863034138-o1pov587cg5rpln07jkm6digrbuf39so.apps.googleusercontent.com";

const Root = () => {
  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_ID}>
      <React.StrictMode>
        <div className="h-screen w-screen background-gradient-pages tracking-wide">
          <GlobalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          </GlobalProvider>
        </div>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);
