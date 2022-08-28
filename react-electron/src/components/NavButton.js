/**
 * NavButton
 * Wrapper for a semantic-ui-button styled
 * button, takes in text, link, and whether to display
 * or not as properties
 *
 * @date 8/22/2022
 * @author Ashton Statz
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavButton = ({ disabled, text, link, onClick }) => {
    if (disabled === true) {
        return (
            <div className='NavButton'>
                <div>
                    <Button disabled>{text}</Button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='NavButton'>
                <div>
                    <Link to={link}>
                        <Button onClick={onClick}>{text}</Button>
                    </Link>
                </div>
            </div>
        );
    }
};

export default NavButton;
