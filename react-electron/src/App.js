import './App.css';
import React from "react";
import { useEffect, useState } from "react";
import ChooseMeals from "./pages/ChooseMeals.js";

const App = () => {
  return (
    <div className="App">
        <div class="basic-container">
            <ChooseMeals />
        </div>
        <p class="footnote">Grocer 2021, created by Ashton Statz</p>
    </div>
  );
};

export default App;
