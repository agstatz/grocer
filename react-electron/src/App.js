import './App.css';
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChooseMeals, ChooseIngredients } from "./pages/";


const App = () => {

    return (
        <div className="App">
            <div class="basic-container">
                <Router>
                    <Routes>
                        <Route exact path='/' element={ <ChooseMeals />} />
                        <Route exact path='/ingredients' element={ <ChooseIngredients />} />
                        <Route path='*' element={<div>No page found</div>} />
                    </Routes>
                </Router>
            </div>
            <p class="footnote">Grocer 2021, created by Ashton Statz</p>
        </div>
    );
};

export default App;
