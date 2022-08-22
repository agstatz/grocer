/**
 * Decision.js
 * Page where the user chooses to either print out
 * their grocery list or to try and order it from
 * a grocery store using their API
 *
 * @date 7/31/2022
 * @author Ashton Statz
 */

import React from 'react';
import { NavButton } from '../components';

const Decision = () => {
    return (
        <div>
            <h1>grocer</h1>
            <p className='no-click'>OK: What will it be?</p>
            <div className='ui horizontal list'>
                <div className='item'>
                    <NavButton
                        text={'Back'}
                        display={true}
                        link={'/additional'}
                    />
                </div>
                <div className='item'>
                    <NavButton
                        text={'Back Home'}
                        display={true}
                        link={'/meals'}
                    />
                </div>
                <div className='item'>
                    <NavButton
                        text={'Print Grocery List'}
                        display={true}
                        link={'/printGrocery'}
                    />
                </div>
                <div className='item'>
                    <NavButton
                        text={'Order Groceries'}
                        display={true}
                        link={'/orderGrocery'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Decision;
