/**
 * HomeButton.js
 * Wrapper for a button that allows access to the
 * home page
 *
 * @date 8/28/2022
 * @author Ashton Statz
 */
import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = () => {
    return (
        <div className='home-button'>
            <Link to='/'>
                <i className='large home icon'></i>
                <div>Home</div>
            </Link>
        </div>
    );
};

export default HomeButton;
