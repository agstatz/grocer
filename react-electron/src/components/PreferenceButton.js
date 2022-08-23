/**
 * PreferenceButton.js
 * Wrapper for a button that allows access to the
 * preferences page
 *
 * @date 8/23/2022
 * @author Ashton Statz
 */
import React from 'react';
import { Link } from 'react-router-dom';

const PreferenceButton = () => {
    return (
        <div className='preference-button'>
            <Link to='/preferences'>
                <i className='large cog icon'></i>
                <div>Preferences</div>
            </Link>
        </div>
    );
};

export default PreferenceButton;
