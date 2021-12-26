/**
 * NextButton
 * Wrapper class for semantic-ui-button
 */
import React from 'react';
import { Button } from 'semantic-ui-react';

const NextButton = ({display, onClick}) => {
    if (display === true) {
        return (
            <div className="NextButton">
                <div><Button onClick={onClick}>Next</Button></div>
            </div>
        );
    } else {
        return (
            <div className="NextButton"></div>
        )
    }
    
};
  
export default NextButton;
  