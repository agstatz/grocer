/**
 * App.js
 * Primary file for the entire application
 * 
 * @author Ashton Statz
 * @date 12/26/21
 */

import './styles/App.css';
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChooseMeals, ChooseIngredients } from "./pages/";
import { useState } from "react";


const App = () => {

    const [meals, setMeals] = React.useState("");

    // handle updating the meals object in App.js
    // when a change happens in ChooseMeals 
    const updateMeals = ({newMeals}) => {
        setMeals(newMeals);
        console.log("BEEF");
        console.log(newMeals[0].ID);
    }

    return (
        <div className="App">
            <div class="basic-container">
                <Router>
                    <Routes>
                        <Route exact path='/' element={ <ChooseMeals handleChange={updateMeals} />} />
                        <Route exact path='/ingredients' element={ <ChooseIngredients meals={meals} />} />
                        <Route path='*' element={<div>No page found</div>} />
                    </Routes>
                </Router>
            </div>
            <p class="footnote">Grocer 2021, created by Ashton Statz</p>
        </div>
    );
};

export default App;
