/**
 * ChooseMeals.js
 * Page where the user chooses their meals
 *
 * @date 5/19/2022
 * @author Ashton Statz
 */
import React from 'react';
import { SearchPanel, SearchPanelVariant } from 'react-search-panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavButton from '../components/NavButton.js';

// Set DEV_MODE to true to use a local database
const DEV_MODE = true;

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed.
// ** sheet.best only allows for 100 requests per month, so use sparingly
const sheetsAPIurl =
    'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const ChooseMeals = ({ handleChange }) => {
    const [choices, setChoices] = React.useState('');
    const [input, setInput] = React.useState('');
    const [mealData, setMealData] = React.useState('');
    const [displayButton, setDisplayButton] = React.useState(false);
    const [selectedChoices, setSelectedChoices] = useState(choices);

    useEffect(() => {
        // There are limited calls to the google sheets API, so in the case that
        // we are in development mode, just use a local testing file.
        if (DEV_MODE) {
            const getDevDatabase = async () => {
                const response = await axios.get('./developmentDatabase.json');
                setMealData(response.data);
            };
            getDevDatabase();
        } else {
            const getDatabase = async () => {
                const response = await axios.get(sheetsAPIurl);
                setMealData(response.data);
            };
            getDatabase();
        }
    }, []);

    useEffect(() => {
        // Searches list of meals for similar meal names
        const getSearchResults = () => {
            let matchList = [];
            var i = 0;
            for (i = 0; i < mealData.length; i++) {
                if (
                    mealData[i].MEAL_NAME.toLowerCase().includes(
                        input.toLowerCase()
                    )
                ) {
                    matchList.push({
                        key: mealData[i].ID,
                        description: mealData[i].MEAL_NAME,
                    });
                }
            }

            return matchList;
        };

        const search = async () => {
            setChoices(getSearchResults());
        };
        search();
    }, [input]);

    // When there are selected meals, give the user the option to move on
    // else, we do not let the user move to the next page.
    useEffect(() => {
        if (selectedChoices.length > 0) {
            const mealArray = getMealDetails();
            handleChange(mealArray);
            setDisplayButton(true);
        } else {
            setDisplayButton(false);
        }
    }, [selectedChoices]);

    // Gets a list of details including ingredients about a selected
    // meal. Used when figuring out whether there are selected meals or not
    const getMealDetails = () => {
        let mealDetailsArray = [];

        for (let i = 0; i < selectedChoices.length; i++) {
            for (let j = 0; j < mealData.length; j++) {
                if (selectedChoices[i].description === mealData[j].MEAL_NAME) {
                    mealDetailsArray.push({
                        MEAL_NAME: mealData[j].MEAL_NAME,
                        INGREDIENTS: mealData[j].INGREDIENTS,
                        OPTIONAL: mealData[j].OPTIONAL,
                        VEGETARIAN: mealData[j].VEGETARIAN,
                    });
                }
            }
        }

        return mealDetailsArray;
    };

    return (
        <div>
            <div>
                <h1>grocer</h1>
                <p className='no-click'>
                    Search meals, order ingredients fast and simple.
                </p>
            </div>
            <br />
            <h4>Select the meals for this grocery list</h4>
            <div>
                <SearchPanel
                    choices={choices}
                    chips
                    maximumHeight={250}
                    onChange={(event) => setInput(event.target.value)}
                    onSelectionChange={setSelectedChoices}
                    placeholder='Search'
                    variant={SearchPanelVariant.checkbox}
                    shadow
                    selectedChoices={selectedChoices}
                    value={input}
                    width={'calc(300 + 10vmin)'}
                />
            </div>
            <br />
            <div>
                <NavButton
                    display={displayButton}
                    text={'Next'}
                    link='/ingredients'
                />
            </div>
        </div>
    );
};

export default ChooseMeals;
