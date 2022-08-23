/**
 * NoPageFound.js
 * Page where user is directed if they access some
 * page that does not exist
 *
 * @date 8/23/2022
 * @author Ashton Statz
 */
import React from 'react';
import NavButton from '../components/NavButton.js';

const NoPageFound = () => {
    return (
        <div className='basic-container'>
            <div className='NoPageFound'>
                <p className='app-title'>No Page Found</p>
                <NavButton text={'Return Home'} link={'/'} display={true} />
            </div>
        </div>
    );
};

export default NoPageFound;
