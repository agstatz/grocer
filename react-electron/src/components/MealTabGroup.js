/**
 * MealTabGroup.js
 * Tabs that label an ingredient with its respective meal
 *
 * @date 9/8/2022
 * @author Ashton Statz
 */
import React, { useEffect, useState } from 'react';
import { MealTab } from './';

const MealTabGroup = ({ meals, mealColors }) => {
    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
        if (meals === null) {
            setIsNull(true);
        }
    }, []);

    return (
        <>
            {isNull ? (
                <></>
            ) : (
                <>
                    {meals.map((meal) => {
                        return (
                            <MealTab mealColors={mealColors} mealName={meal} />
                        );
                    })}
                </>
            )}
        </>
    );
};

export default MealTabGroup;
