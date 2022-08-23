/**
 * Preferences.js
 * First page a user visits. User can choose to use
 * developer database or their own database by inputting their own
 * URL
 *
 * @date 8/23/2022
 * @author Ashton Statz
 */
import React from 'react';
import { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import NavButton from '../components/NavButton.js';

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed.
// ** sheet.best only allows for 100 requests per month, so use sparingly
const sheetsAPIurl =
    'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const Preferences = () => {
    const [displayNext, setDisplayNext] = useState(0);
    const [usingDev, setUsingDev] = useState('undefined');
    const [vegetarian, setVegetarian] = useState('undefined');

    const toggleUsingDev = (e) => {
        if (usingDev === 'undefined') {
            if (e.target.innerHTML === 'Use Default List') {
                setUsingDev('true');
            } else {
                setUsingDev('false');
            }

            setDisplayNext(displayNext + 1);
        }

        if (usingDev === 'true') {
            if (e.target.innerHTML !== 'Use Default List') {
                setUsingDev('false');
            }
        }

        if (usingDev === 'false') {
            if (e.target.innerHTML === 'Use Default List') {
                setUsingDev('true');
            }
        }
    };

    const toggleVegetarian = (e) => {
        if (vegetarian === 'undefined') {
            if (e.target.innerHTML === 'Yes') {
                setVegetarian('true');
            } else {
                setVegetarian('false');
            }

            setDisplayNext(displayNext + 1);
        }

        if (vegetarian === 'true') {
            if (e.target.innerHTML !== 'Yes') {
                setVegetarian('false');
            }
        }

        if (vegetarian === 'false') {
            if (e.target.innerHTML === 'Yes') {
                setVegetarian('true');
            }
        }
    };

    return (
        <div>
            <h1>Preferences</h1>
            <br />
            <div className='inner-container'>
                <p className='no-click questionnaire'>
                    Would you like to use the default recipe book or your own
                    custom recipes?
                </p>
                <div className='ui horizontal list'>
                    <div className='item'>
                        <Button
                            toggle
                            active={usingDev === 'true'}
                            size='big'
                            style={{ height: '125px', width: '125px' }}
                            onClick={toggleUsingDev}
                        >
                            Use Default List
                        </Button>
                    </div>
                    <div className='item'>
                        <Button
                            toggle
                            active={usingDev === 'false'}
                            size='big'
                            style={{ height: '125px', width: '125px' }}
                            onClick={toggleUsingDev}
                        >
                            Use Custom List
                        </Button>
                    </div>
                </div>
                {usingDev === 'false' ? (
                    <>
                        <br />
                        <br />
                        <p className='no-click questionnaire'>
                            Enter a database URL. Must be a valid sheets.best
                            API endpoint.
                        </p>
                        <Input
                            label='http://'
                            placeholder='mysite.com'
                            size='small'
                            style={{ width: '80%' }}
                        />
                        <Button>Submit</Button>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className='inner-container'>
                <p className='no-click questionnaire'>Are you a vegetarian?</p>
                <div className='ui horizontal list'>
                    <div className='item'>
                        <Button
                            toggle
                            active={vegetarian === 'true'}
                            size='big'
                            style={{ height: '125px', width: '125px' }}
                            onClick={toggleVegetarian}
                        >
                            Yes
                        </Button>
                    </div>
                    <div className='item'>
                        <Button
                            toggle
                            active={vegetarian === 'false'}
                            size='big'
                            style={{ height: '125px', width: '125px' }}
                            onClick={toggleVegetarian}
                        >
                            No
                        </Button>
                    </div>
                </div>
            </div>
            <br />
            <div>
                <NavButton display={displayNext === 2} text={'Next'} link='/' />
            </div>
        </div>
    );
};

export default Preferences;
