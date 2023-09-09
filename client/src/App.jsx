import "./App.scss";
// imports
import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, useLocation } from "react-router-dom";
// views and components imports
import Home from "./views/Home/Home";
import CountryDetails from "./views/CountryDetails/CountryDetails";
import Form from "./views/ActivityForm/ActivityForm";
import LandingPage from "./views/LandingPage/LandingPage";
import About from "./views/About/About";
import Page404 from "./views/404/Page404";
import NavBar from "./components/NavBar/NavBar";

function App() {
  //pathname to hide nav
  const { pathname } = useLocation();
  return (
    <div>
      {/* rendering the Nav component conditionally */}
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<CountryDetails />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
