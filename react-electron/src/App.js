/**
 * App.js
 * Primary file for the entire application.
 * Contains the router through which the page components
 * are displayed based on a given path
 *
 * @author Ashton Statz
 * @date 9/8/2022
 */

import './styles/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ChooseMeals,
    ChooseIngredients,
    NoPageFound,
    ReviewList,
    PrintGroceries,
    Preferences,
} from './pages/';
import { Grid } from 'semantic-ui-react';
import { PreferenceButton, HomeButton } from './components/';

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed.
// ** sheet.best only allows for 100 requests per month, so use sparingly
const SHEETS_API_URL =
    'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const App = () => {
    const [preferences, setPreferences] = useState({});
    const [meals, setMeals] = useState([]); // Stores selected meals
    const [ingredients, setIngredients] = useState([]); // Stores selected ingredients

    useEffect(() => {
        initializePreferences();
    }, []);

    // initializes the preferences to their default values
    // TODO: make sure the values are obtained from some I/O
    // mechanism that is updated as needed.
    const initializePreferences = () => {
        setPreferences({
            useDefaultRecipeBook: true,
            recipeBookURL: SHEETS_API_URL,
            useDevMode: true,
            isVegetarian: false,
        });
    };

    // sets preferences when change happens in
    // another component (Preferences page)
    const updatePreferences = (newPrefs) => {
        setPreferences(newPrefs);
        console.log(newPrefs);
    };

    const getDefaultRecipeBook = () => {
        return SHEETS_API_URL;
    };

    // allows other components to access
    // previous preferences
    const getPreferences = () => {
        return preferences;
    };

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
            <div className='app-title'>grocer</div>
            <br />
            <p className='no-click'>
                Search meals, order ingredients fast and simple.
            </p>
            <br />
            <Router>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <ChooseMeals
                                handleChange={updateMeals}
                                devMode={preferences.useDevMode}
                                sheetsAPIurl={preferences.recipeBookURL}
                                isVegetarian={preferences.isVegetarian}
                                getMeals={getMeals}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/preferences'
                        element={
                            <Preferences
                                getPreferences={getPreferences}
                                updatePreferences={updatePreferences}
                                preferences={preferences}
                                getDefaultRecipeBook={getDefaultRecipeBook}
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
                                isVegetarian={preferences.isVegetarian}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/review'
                        element={
                            <ReviewList
                                meals={meals}
                                ingredients={ingredients}
                                handleChange={updateIngredients}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/printGrocery'
                        element={<PrintGroceries ingredients={ingredients} />}
                    />
                    <Route path='*' element={<NoPageFound />} />
                </Routes>
                <br />
                <Grid columns={8} style={{ paddingTop: '20px' }}>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <HomeButton />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <PreferenceButton />
                    </Grid.Column>
                </Grid>

                <p className='footnote'>
                    Grocer v0.2.0, created by Ashton Statz, 2021-22
                </p>
                <br />
            </Router>
        </div>
    );
};

export default App;
