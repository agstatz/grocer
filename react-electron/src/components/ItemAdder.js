/**
 * ItemAdder.js
 * Widget that handles adding a new item to the
 * grocery list
 *
 * @date 9/14/2022
 * @author Ashton Statz
 */

import { React, useEffect, useState } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';

const ItemAdder = ({
    ingredients,
    handleChange,
    setTypedIngredient,
    pageError,
    resetPageError,
}) => {
    const [mode, setMode] = useState('empty');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error');
    const [ingredient, setIngredient] = useState('');

    // must run every time mode is updated to properly set up
    // the event handler that only is bound to the var input
    // (only rended when mode === edit)
    useEffect(() => {
        var input = document.getElementById('itemAdderInput');

        if (input !== null) {
            input.addEventListener('keyup', function (KeyboardEvent) {
                if (KeyboardEvent.key === 'Enter') {
                    KeyboardEvent.preventDefault();
                    submitItemFromEnter(input.value);
                }
            });
        }
    }, [mode]);

    // runs every time there is an update to pageError
    // which occurs when the user attempts to progress
    // while the new item has unsaved info
    useEffect(() => {
        if (pageError === true) {
            setErrorMessage('Unsaved new item');
            setError(true);
        } else {
            setError(false);
            setErrorMessage('');
        }
    }, [pageError]);

    // changeMode(value)
    // changes the mode to value, which alters the display
    // to either show an input box or just a button
    const changeMode = (value) => {
        setMode(value);
        setIngredient('');
        setTypedIngredient('');
    };

    // submitItem()
    // validates the item and submits it
    // to the grocery list if valid
    const submitItem = () => {
        //resetPageError();
        let newIngredient = ingredient;
        if (validateItem(newIngredient)) {
            var currentIngredients = ingredients;
            currentIngredients.push({ ingredient: newIngredient, meal: null });
            handleChange(currentIngredients);
            changeMode('empty');
        }
    };

    const submitItemFromEnter = (newItem) => {
        if (validateItem(newItem)) {
            var currentIngredients = ingredients;
            currentIngredients.push({ ingredient: newItem, meal: null });
            handleChange(currentIngredients);
            changeMode('empty');
        }
    };

    // validateItem(newIngredient)
    // tests to make sure the new item
    // is a valid item to be added to the list, returns
    // true if it is
    const validateItem = (newIngredient) => {
        if (newIngredient.length < 1) {
            setErrorMessage('new item must have at least one character.');
            setError(true);
            return false;
        }

        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].ingredient === newIngredient) {
                setErrorMessage(
                    newIngredient + ' is already included in the list.'
                );
                setError(true);
                return false;
            }
        }

        return true;
    };

    // updateItem()
    // updates the stored value of the item
    const updateItem = () => {
        endErrorMessage();
        const value = document.getElementById('itemAdderInput').value;
        setIngredient(value);
        setTypedIngredient(value);
    };

    // endErrorMessage()
    // stops showing error message when called
    const endErrorMessage = () => {
        setError(false);
        resetPageError();
    };

    return (
        <>
            {mode === 'empty' ? (
                <Button onClick={changeMode}>Add More Items</Button>
            ) : (
                <Input
                    size='mini'
                    style={{ width: '85%' }}
                    id='itemAdderInput'
                    placeholder='Add an Item'
                    onChange={updateItem}
                    autoFocus
                    action={{ icon: 'plus', onClick: submitItem }}
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

export default ItemAdder;
