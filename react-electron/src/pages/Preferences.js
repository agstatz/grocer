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
import { useState } from 'react';
import { Button, Input, Grid, Checkbox } from 'semantic-ui-react';
import NavButton from '../components/NavButton.js';

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed.
// ** sheet.best only allows for 100 requests per month, so use sparingly
const sheetsAPIurl =
    'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const Preferences = ({ getPreferences, updatePreferences }) => {
    const [usingDev, setUsingDev] = useState(true);
    const [vegetarian, setVegetarian] = useState(false);

    const toggleUsingDev = () => {
        setUsingDev(!usingDev);
    };

    const toggleVegetarian = (e) => {
        setVegetarian(!vegetarian);
    };

    return (
        <div className='basic-container'>
            <div>
                <h1>Preferences</h1>
                <br />
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <div className='no-click align-left app-subtitle'>
                                <i className='book icon'></i>Use Default Recipe
                                Book
                            </div>
                            <p className='no-click questionnaire-text'>
                                You may use the default recipe book or your own.
                                Requires proper configuration of a google sheets
                                page with such recipes in order to function
                                correctly in the application.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6}></Grid.Column>
                        <Grid.Column width={2} verticalAlign='middle'>
                            <Checkbox
                                className='toggle'
                                checked={usingDev}
                                onChange={toggleUsingDev}
                                toggle
                            />
                        </Grid.Column>
                    </Grid.Row>

                    {!usingDev ? (
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <p className='no-click questionnaire-text'>
                                    Enter a database URL. Must be a valid
                                    sheets.best API endpoint.
                                </p>
                                <Input
                                    label='http://'
                                    placeholder='mysite.com'
                                    size='small'
                                    className='left-align'
                                />
                                <Button>Submit</Button>
                            </Grid.Column>
                        </Grid.Row>
                    ) : (
                        <></>
                    )}
                    <Grid.Row columns={3}>
                        <Grid.Column width={8}>
                            <div className='no-click align-left app-subtitle'>
                                <i className='food icon'></i>Suggest Vegetarian
                                Meals
                            </div>
                            <p className='no-click questionnaire-text'>
                                Are you a vegetarian? Toggle to only see meals
                                that are vegetarian or have vegetarian options
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
                <br />
                <div className='align-right'>
                    <div className='ui horizontal list'>
                        <div className='item'>
                            <Button>Cancel</Button>
                        </div>
                        <div className='item'>
                            <Button>Save</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <NavButton text={'Next'} link='/' />
                </div>
            </div>
        </div>
    );
};

export default Preferences;
