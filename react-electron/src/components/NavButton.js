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
                <div class='ui right floated disabled primary button'>
                    {text === 'Back' ? (
                        <i class='left chevron icon'></i>
                    ) : (
                        <></>
                    )}
                    {text}
                    {text === 'Next' ? (
                        <i class='right chevron icon'></i>
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
                            class='ui right floated primary button'
                        >
                            {text === 'Back' ? (
                                <i class='left chevron icon'></i>
                            ) : (
                                <></>
                            )}
                            {text}
                            {text === 'Next' ? (
                                <i class='right chevron icon'></i>
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
