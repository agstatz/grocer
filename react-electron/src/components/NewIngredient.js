/**
 * NewIngredient.js
 * Widget that handles adding a new ingredient
 *
 * @date 9/6/2022
 * @author Ashton Statz
 */

import { React, useEffect, useState } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';

const NewIngredient = ({ ingredients, handleChange }) => {
    const [mode, setMode] = useState('empty');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error');
    const [ingredient, setIngredient] = useState('');

    useEffect(() => {
        var input = document.getElementById('newIngredientInput');

        if (input !== null) {
            input.addEventListener('keyup', function (KeyboardEvent) {
                if (KeyboardEvent.key === 'Enter') {
                    console.log('hey');
                    KeyboardEvent.preventDefault();
                    updateIngredient();
                }
            });
        }
    }, [mode]);

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
        } else {
            setError(true);
        }
    };

    const validateIngredient = (newIngredient) => {
        if (newIngredient.length < 1) {
            setErrorMessage('new item must have at least one character.');
            return false;
        }

        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].ingredient === newIngredient) {
                setErrorMessage(
                    newIngredient + ' is already included in the list.'
                );
                return false;
            }
        }

        return true;
    };

    const setEditMode = () => {
        changeMode('edit');
    };

    const endErrorMessage = () => {
        setError(false);
    };

    return (
        <>
            {mode === 'empty' ? (
                <Button onClick={changeMode}>Add More Items</Button>
            ) : mode === 'full' ? (
                <li>
                    {ingredient}
                    <Button icon='edit' onClick={setEditMode}></Button>
                </li>
            ) : (
                <Input
                    size='mini'
                    id='newIngredientInput'
                    placeholder='Add an Item'
                    onChange={endErrorMessage}
                    autoFocus
                    action={{ icon: 'plus', onClick: updateIngredient }}
                ></Input>
            )}
            <br />
            {error ? (
                <Message negative color='red' size='small' compact floating>
                    <Message.Header>Error: {errorMessage}</Message.Header>
                </Message>
            ) : (
                <></>
            )}
            <br />
        </>
    );
};

export default NewIngredient;
