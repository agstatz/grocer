/**
 * NoPageFound.js
 * Page where user is directed if they access some
 * page that does not exist
 *
 * @date 8/22/2022
 * @author Ashton Statz
 */
import React from 'react';
import NavButton from '../components/NavButton.js';

const NoPageFound = () => {
    return (
        <div className='NoPageFound'>
            <p className='app-title'>No Page Found</p>
            <NavButton text={'Return Home'} link={'/meals'} display={true} />
        </div>
    );
};

export default NoPageFound;
