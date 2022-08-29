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
import { Button, Input, Grid, Checkbox } from 'semantic-ui-react';

const SHEETS_PLACEHOLDER = 'https://sheet.best/api/sheets/...';

const Preferences = ({ getPreferences, updatePreferences, preferences }) => {
    const [usingDefaultBook, setUsingDefaultBook] = useState(true);
    const [usingDevMode, setUsingDevMode] = useState(true);
    const [vegetarian, setVegetarian] = useState(false);

    // initializes saved values for preferences
    useEffect(() => {
        setUsingDefaultBook(preferences.useDefaultRecipeBook);
        setUsingDevMode(preferences.useDevMode);
        setVegetarian(preferences.isVegetarian);
    }, []);

    // toggles whether user is using default recipe book
    // or using a custom recipe book
    const toggleUsingDefaultBook = () => {
        setUsingDefaultBook(!usingDefaultBook);
    };

    // toggles whether the user is using a locally hosted
    // recipe book or a sheets.best one
    const toggleUsingDevMode = () => {
        setUsingDevMode(!usingDevMode);
    };

    // toggles whether the user is vegetarian or not
    const toggleVegetarian = () => {
        setVegetarian(!vegetarian);
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
                    {!usingDefaultBook ? (
                        <Grid.Row columns={2}>
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
                                    />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    ) : (
                        <></>
                    )}
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
                <div className='align-right'>
                    <Button primary>Save</Button>
                    <Button>Cancel</Button>
                </div>
                <div style={{ paddingBottom: '20px' }}></div>
            </div>
        </div>
    );
};

export default Preferences;
