/**
 * ChooseIngredients.js
 * Page where the user chooses ingredients based on
 * which meals they have chosen.
 *
 * @date 7/31/2022
 * @author Ashton Statz
 */

import React from 'react';
import { NavButton, IngredientSelector } from '../components';

const ChooseIngredients = ({ mealList, handleChange }) => {
    return (
        <div>
            <h1>grocer</h1>
            <p className='no-click'>Choose Ingredients</p>
            <IngredientSelector
                mealList={mealList}
                handleChange={handleChange}
            />
            <div className='ui horizontal list'>
                <div className='item'>
                    <NavButton text={'Back'} display={true} link={'/meals'} />
                </div>
                <div className='item'>
                    <NavButton
                        text={'Next'}
                        display={true}
                        link={'/additional'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChooseIngredients;
