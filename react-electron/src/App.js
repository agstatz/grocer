/**
 * App.js
 * Primary file for the entire application
 * 
 * @author Ashton Statz
 * @date 1/5/22
 */

import './styles/App.css';
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChooseMeals, ChooseIngredients, NoPageFound } from "./pages/";
import { useState } from "react";


const App = () => {

    const [meals, setMeals] = useState("");

    // handle updating the meals object in App.js
    // when a change happens in ChooseMeals 
    const updateMeals = (selectedMealsList) => {
        setMeals(selectedMealsList);
    }

    return (
        <div className="App">
            <div class="basic-container">
                <Router>
                    <Routes>
                        <Route exact path='/' element={ <ChooseMeals handleChange={updateMeals} />} />
                        <Route exact path='/ingredients' element={ <ChooseIngredients mealList={meals} />} />
                        <Route path='*' element={<NoPageFound />} />
                    </Routes>
                </Router>
            </div>
            <p class="footnote">Grocer 2021, created by Ashton Statz</p>
        </div>
    );
};

export default App;
