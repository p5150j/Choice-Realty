import React from "react";
import app from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import HomePage from "./pages/HomePage";
import ListingDetails from "./pages/ListingDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddArticle from "./pages/AddArticle";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import AboutPage from "./pages/AboutPage";

import Navigation from "./Navigation";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <Router>
        <div className="font-sans antialiased text-gray-900">
          <Navigation />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/add-article" element={<AddArticle />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;
