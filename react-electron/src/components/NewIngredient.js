/**
 * NewIngredient.js
 * Widget that handles adding a new ingredient
 *
 * @date 7/15/2022
 * @author Ashton Statz
 */

import { React, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';

const NewIngredient = ({ ingredients, handleChange }) => {
    const [mode, setMode] = useState('empty');
    const [ingredient, setIngredient] = useState('');

    const changeMode = (value) => {
        setMode(value);
    };

    const updateIngredient = () => {
        const value = document.getElementById('newIngredientInput').value;

        if (validateIngredient(value)) {
            var currentIngredients = ingredients;
            currentIngredients.push({ ingredient: value, meal: null });
            handleChange(currentIngredients);
            changeMode('empty');
        }
    };

    const validateIngredient = (newIngredient) => {
        if (newIngredient.length <= 1) {
            return false;
        }

        return true;
    };

    const setEditMode = () => {
        changeMode('edit');
    };

    return (
        <>
            {mode === 'empty' ? (
                <Button onClick={changeMode}>Add More Ingredients</Button>
            ) : mode === 'full' ? (
                <li>
                    {ingredient}
                    <Button icon='edit' onClick={setEditMode}></Button>
                </li>
            ) : (
                <Input
                    size='mini'
                    id='newIngredientInput'
                    placeholder='Add an Ingredient'
                    action={{ icon: 'plus', onClick: updateIngredient }}
                ></Input>
            )}

            <div>
                <br></br>
            </div>
        </>
    );
};

export default NewIngredient;
