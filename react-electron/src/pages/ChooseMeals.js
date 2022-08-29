/**
 * ChooseMeals.js
 * Page where the user chooses their meals
 *
 * @date 8/28/2022
 * @author Ashton Statz
 */
import React from 'react';
import { SearchPanel, SearchPanelVariant } from 'react-search-panel';
import { useEffect, useState } from 'react';
import { NavButton } from '../components/';
import axios from 'axios';

const ChooseMeals = ({
    handleChange,
    getMeals,
    devMode,
    sheetsAPIurl,
    isVegetarian,
}) => {
    const [choices, setChoices] = useState('');
    const [input, setInput] = useState('');
    const [mealData, setMealData] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [selectedChoices, setSelectedChoices] = useState(choices);

    useEffect(() => {
        // check if we already have some selected meals
        // from previous selection

        if (getMeals().length > 0) {
            let currentMeals = getMeals();
            let newSelectedChoices = [];

            for (let i = 0; i < currentMeals.length; i++) {
                newSelectedChoices.push({
                    key: currentMeals[i].KEY,
                    description: currentMeals[i].MEAL_NAME,
                });
            }

            setSelectedChoices(newSelectedChoices);
        }

        // There are limited calls to the google sheets API, so in the case that
        // we are in development mode, just use a local testing file.
        if (devMode) {
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

    // Searches list of meals for similar meal names
    useEffect(() => {
        const getSearchResults = () => {
            let matchList = [];
            var i = 0;
            for (i = 0; i < mealData.length; i++) {
                if (
                    mealData[i].MEAL_NAME.toLowerCase().includes(
                        input.toLowerCase()
                    )
                ) {
                    // skip including matches that are none veg
                    // if the user is vegetarian
                    if (isVegetarian) {
                        if (mealData[i].VEGETARIAN === 'No') {
                            continue;
                        }
                    }

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
            const mealArray = getMealDetails(selectedChoices);
            handleChange(mealArray);
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [selectedChoices]);

    // Gets a list of details including ingredients about a selected
    // meal. Used when figuring out whether there are selected meals or not
    const getMealDetails = (selectedChoices) => {
        let mealDetailsArray = [];

        for (let i = 0; i < selectedChoices.length; i++) {
            for (let j = 0; j < mealData.length; j++) {
                if (selectedChoices[i].description === mealData[j].MEAL_NAME) {
                    mealDetailsArray.push({
                        KEY: selectedChoices[i].key,
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

    const finalSubmit = () => {
        const mealArray = getMealDetails(selectedChoices);
        handleChange(mealArray);
    };

    return (
        <div className='basic-container'>
            <div>
                <h1>Choose Meals</h1>
                <p className='align-left'>
                    Search the recipe book for meals you would like to shop for.
                </p>
                <div>
                    <SearchPanel
                        choices={choices}
                        chips
                        maximumHeight={200}
                        onChange={(event) => setInput(event.target.value)}
                        onSelectionChange={setSelectedChoices}
                        placeholder='Search'
                        variant={SearchPanelVariant.checkbox}
                        preSelectedChoices={selectedChoices}
                        value={input}
                    />
                </div>
                <br />
                <div style={{ paddingBottom: '20px' }}>
                    <NavButton
                        disabled={disableButton}
                        text={'Next'}
                        onClick={finalSubmit}
                        link={'/ingredients'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChooseMeals;
