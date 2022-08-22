/**
 * App.js
 * Primary file for the entire application.
 * Contains router through which the "pages" are
 * displayed.
 *
 * @author Ashton Statz
 * @date 8/22/2022
 */

import './styles/App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ChooseMeals,
    ChooseIngredients,
    Decision,
    NoPageFound,
    AdditionalIngredients,
    PrintGroceries,
    Preferences,
} from './pages/';
import { useState } from 'react';

const App = () => {
    const [meals, setMeals] = useState([]); // Stores selected meals
    const [ingredients, setIngredients] = useState([]); // Stores selected ingredients

    // sets meals when a change happens
    // to meals in another component
    const updateMeals = (selectedMealsList) => {
        setMeals(selectedMealsList);
    };

    // returns list of currently stored meals
    const getMeals = () => {
        return meals;
    };

    // handle updating the ingredients stored in App.js
    // when a change occurs in ChooseIngredients or AdditionalIngredients
    const updateIngredients = (selectedIngredientsList) => {
        setIngredients(selectedIngredientsList);
    };

    return (
        <div className='App'>
            <div className='basic-container'>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Preferences />} />
                        <Route
                            exact
                            path='/meals'
                            element={
                                <ChooseMeals
                                    handleChange={updateMeals}
                                    getMeals={getMeals}
                                />
                            }
                        />
                        <Route
                            exact
                            path='/ingredients'
                            element={
                                <ChooseIngredients
                                    mealList={meals}
                                    handleChange={updateIngredients}
                                />
                            }
                        />
                        <Route
                            exact
                            path='/additional'
                            element={
                                <AdditionalIngredients
                                    ingredients={ingredients}
                                    handleChange={updateIngredients}
                                />
                            }
                        />
                        <Route exact path='/decision' element={<Decision />} />
                        <Route
                            exact
                            path='/printGrocery'
                            element={
                                <PrintGroceries ingredients={ingredients} />
                            }
                        />
                        <Route path='*' element={<NoPageFound />} />
                    </Routes>
                </Router>
            </div>
            <p className='footnote'>
                Grocer v0.1.0, created by Ashton Statz, 2021/22
            </p>
        </div>
    );
};

export default App;
