/**
 * NextButton
 * Wrapper class for semantic-ui-button
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NextButton = ({display, text, link}) => {
    if (display === true) {
        return (
            <div className="NextButton">
                <div>
                    <Link to={link}><Button>{text}</Button></Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="NextButton"></div>
        )
    }
    
};
  
export default NextButton;
  