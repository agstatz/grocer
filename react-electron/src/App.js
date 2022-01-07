/**
 * App.js
 * Primary file for the entire application.
 * Contains router through which the "pages" are
 * displayed.
 * 
 * @author Ashton Statz
 * @date 1/6/2022
 */

import './styles/App.css';
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChooseMeals, ChooseIngredients, Decision, NoPageFound } from "./pages/";
import { useState } from "react";


const App = () => {

    const [meals, setMeals] = useState([]);                 // Stores selected meals
    const [ingredients, setIngredients] = useState([]);     // Stores selected ingredients

    // handle updating the meals in App.js
    // when a change happens in ChooseMeals 
    const updateMeals = (selectedMealsList) => {
        setMeals(selectedMealsList);
    }

    // handle updating the ingredients stored in App.js
    // when a change occurs in ChooseIngredients
    const updateIngredients = (newIngredients) => {
        setIngredients(newIngredients);
    }

    return (
        <div className="App">
            <div class="basic-container">
                <Router>
                    <Routes>
                        <Route exact path='/' element={ <ChooseMeals handleChange={updateMeals} />} />
                        <Route exact path='/ingredients' element={ <ChooseIngredients mealList={meals} handleChange={updateIngredients}/>} />
                        <Route exact path='/decision' element={ <Decision />} />
                        <Route path='*' element={<NoPageFound />} />
                    </Routes>
                </Router>
            </div>
            <p class="footnote">Grocer 2021, created by Ashton Statz</p>
        </div>
    );
};

export default App;
