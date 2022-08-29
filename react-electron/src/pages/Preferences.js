/**
 * Preferences.js
 * First page a user visits. User can choose to use
 * developer database or their own database by inputting their own
 * URL
 *
 * @date 8/28/2022
 * @author Ashton Statz
 */
import React from 'react';
import { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Grid,
    Checkbox,
    Transition,
    Message,
} from 'semantic-ui-react';

const SHEETS_PLACEHOLDER = 'https://sheet.best/api/sheets/...';
const INVALID_URL = 'invalid URL.';
const INVALID_PREFERENCES =
    'the selected preferences states are not compatible.';

const Preferences = ({
    getPreferences,
    updatePreferences,
    preferences,
    getDefaultRecipeBook,
}) => {
    const [usingDefaultBook, setUsingDefaultBook] = useState(true);
    const [recipeBookURL, setRecipeBookURL] = useState('');
    const [usingDevMode, setUsingDevMode] = useState(true);
    const [vegetarian, setVegetarian] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [success, setSuccess] = useState(false);

    const [canceled, setCanceled] = useState(false);

    // initializes saved values for preferences
    useEffect(() => {
        setUsingDefaultBook(preferences.useDefaultRecipeBook);
        setRecipeBookURL(preferences.recipeBookURL);
        setUsingDevMode(preferences.useDevMode);
        setVegetarian(preferences.isVegetarian);
    }, []);

    // toggles whether user is using default recipe book
    // or using a custom recipe book
    const toggleUsingDefaultBook = () => {
        setUsingDefaultBook(!usingDefaultBook);
        setError(false);
        setSuccess(false);
        setCanceled(false);
        if (usingDefaultBook) {
            setUsingDevMode(false);
            setRecipeBookURL('');
        } else {
            setRecipeBookURL(getDefaultRecipeBook());
        }
    };

    // toggles whether the user is using a locally hosted
    // recipe book or a sheets.best one
    const toggleUsingDevMode = () => {
        setUsingDevMode(!usingDevMode);
        setError(false);
        setSuccess(false);
        setCanceled(false);
        if (!usingDevMode) {
            setUsingDefaultBook(true);
            setRecipeBookURL(getDefaultRecipeBook());
        }
    };

    // toggles whether the user is vegetarian or not
    const toggleVegetarian = () => {
        setVegetarian(!vegetarian);
        setError(false);
        setSuccess(false);
        setCanceled(false);
    };

    const handleRecipeChange = (e) => {
        setRecipeBookURL(e.target.value);
        setError(false);
        setSuccess(false);
        setCanceled(false);
    };

    // save the information (pass along up to App.js)
    const handleSave = () => {
        setSuccess(false);
        setCanceled(false);

        if (!recipeBookURL) {
            setError(true);
            setErrorMessage(INVALID_URL);
            return;
        }

        if (recipeBookURL.length < 1) {
            setError(true);
            setErrorMessage(INVALID_URL);
            return;
        }

        if (!recipeBookURL.startsWith('https://')) {
            setError(true);
            setErrorMessage(INVALID_URL);
            return;
        }

        if (!usingDefaultBook && usingDevMode) {
            setError(true);
            setErrorMessage(INVALID_PREFERENCES);
            return;
        }

        const newPreferences = {
            useDefaultRecipeBook: usingDefaultBook,
            recipeBookURL: recipeBookURL,
            useDevMode: usingDevMode,
            isVegetarian: vegetarian,
        };

        updatePreferences(newPreferences);
        setSuccess(true);
    };

    // revert back to the previously saved values
    const handleCancel = () => {
        setError(false);
        setSuccess(false);
        let preferences = getPreferences();
        setUsingDefaultBook(preferences.useDefaultRecipeBook);
        setRecipeBookURL(preferences.recipeBookURL);
        setUsingDevMode(preferences.useDevMode);
        setVegetarian(preferences.isVegetarian);

        setCanceled(true);
    };

    return (
        <div className='basic-container'>
            <div>
                <h1>Preferences</h1>
                <br />
                <Grid style={{ paddingBottom: '40px' }}>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <div className='no-click align-left app-subtitle'>
                                <i className='book icon'></i> Use Default Recipe
                                Book
                            </div>
                            <p className='no-click questionnaire-text'>
                                You may use the default recipe book or your own.
                                Requires proper configuration of a google sheets
                                page with recipes in order to function correctly
                                in the application.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6}></Grid.Column>
                        <Grid.Column width={2} verticalAlign='middle'>
                            <Checkbox
                                className='toggle'
                                checked={usingDefaultBook}
                                onChange={toggleUsingDefaultBook}
                                toggle
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Transition
                        as={Grid.Row}
                        columns={2}
                        unmountOnHide
                        duration={500}
                        animation='slide down'
                        visible={!usingDefaultBook}
                    >
                        <Grid.Column width={10}>
                            <p className='no-click questionnaire-text'>
                                Enter a database URL. Must be a valid
                                sheets.best API endpoint.
                            </p>
                            <div className='align-left'>
                                <Input
                                    style={{
                                        width: 'calc(40px + 20vw)',
                                    }}
                                    placeholder={SHEETS_PLACEHOLDER}
                                    size='mini'
                                    onChange={handleRecipeChange}
                                />
                            </div>
                        </Grid.Column>
                    </Transition>
                    <Grid.Row columns={3}>
                        <Grid.Column width={8}>
                            <div className='no-click align-left app-subtitle'>
                                <i className='code icon'></i> Use Developer Mode
                            </div>
                            <p className='no-click questionnaire-text'>
                                Uses an offline version of the default recipe
                                book for development reasons.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6}></Grid.Column>
                        <Grid.Column width={2} verticalAlign='middle'>
                            <Checkbox
                                toggle
                                className='toggle'
                                checked={usingDevMode}
                                onChange={toggleUsingDevMode}
                                fitted
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column width={8}>
                            <div className='no-click align-left app-subtitle'>
                                <i className='food icon'></i> Set Diet to
                                Vegetarian
                            </div>
                            <p className='no-click questionnaire-text'>
                                Are you a vegetarian? Toggle to only see meals
                                that are vegetarian or have vegetarian options.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6}></Grid.Column>
                        <Grid.Column width={2} verticalAlign='middle'>
                            <Checkbox
                                toggle
                                className='toggle'
                                checked={vegetarian}
                                onChange={toggleVegetarian}
                                fitted
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {error ? (
                    <Message negative color='red' size='small' compact floating>
                        <Message.Header>Error: {errorMessage}</Message.Header>
                    </Message>
                ) : (
                    <></>
                )}
                {success ? (
                    <Message
                        positive
                        color='green'
                        size='small'
                        compact
                        floating
                    >
                        <Message.Header>
                            Preferences updated successfully.
                        </Message.Header>
                    </Message>
                ) : (
                    <></>
                )}
                {canceled ? (
                    <Message size='small' compact floating>
                        <Message.Header>
                            Canceled. Preferences were reverted to most recently
                            saved settings.
                        </Message.Header>
                    </Message>
                ) : (
                    <></>
                )}
                <div className='align-right'>
                    <Button primary onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
                <div style={{ paddingBottom: '20px' }}></div>
            </div>
        </div>
    );
};

export default Preferences;
