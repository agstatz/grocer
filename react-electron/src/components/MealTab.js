/**
 * MealTab.js
 * Tabs that label an ingredient with its respective meal
 *
 * @date 9/8/2022
 * @author Ashton Statz
 */
import React, { useEffect, useState } from 'react';
import { Label } from 'semantic-ui-react';

const MealTab = ({ mealColors, mealName }) => {
    const [color, setColor] = useState('red');

    useEffect(() => {
        for (var i = 0; i < mealColors.length; i++) {
            if (mealName === mealColors[i].meal.MEAL_NAME) {
                setColor(mealColors[i].color);
            }
        }
    }, []);

    return (
        <Label size='tiny' color={color}>
            {mealName}
        </Label>
    );
};

export default MealTab;
