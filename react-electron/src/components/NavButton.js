/**
 * NavButton
 * Wrapper for a semantic-ui-button styled
 * button, takes in text, link, and whether to display
 * or not as properties
 *
 * @date 8/28/2022
 * @author Ashton Statz
 */
import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ disabled, text, link, onClick }) => {
    if (disabled === true) {
        return (
            <div className='NavButton'>
                <div className='ui right floated disabled primary button'>
                    {text === 'Back' ? (
                        <i className='left chevron icon'></i>
                    ) : (
                        <></>
                    )}
                    {text}
                    {text === 'Next' ? (
                        <i className='right chevron icon'></i>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='NavButton'>
                <div>
                    <Link to={link}>
                        <div
                            onClick={onClick}
                            className='ui right floated primary button'
                        >
                            {text === 'Back' ? (
                                <i className='left chevron icon'></i>
                            ) : (
                                <></>
                            )}
                            {text}
                            {text === 'Next' ? (
                                <i className='right chevron icon'></i>
                            ) : (
                                <></>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
};

export default NavButton;
