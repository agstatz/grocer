/**
 * IngredientSelector
 * Modular display component to allow the user
 * to choose the ingredients they would need
 * 
 * @date 12/27/2021
 * @author Ashton Statz
 */
import React, { useEffect } from 'react';
import useState from 'react';

const IngredientSelector = ({mealList}) => {

    let bingbong = [];

    const [ingredientList, setIngredientList] = React.useState("");
    
    // Given the meal data, output a well-formatted
    // list of ingredients and the respective meals
    // that they belong to.
    const createIngredientList = () => {
        let outputList = [];

        if (!mealList) {
            return outputList;
        }

        for (let i = 0; i < mealList.length; i++) {
            const ingredients = mealList[i].INGREDIENTS;
            const optional = mealList[i].OPTIONAL;
            const vegetarian = mealList[i].VEGETARIAN;
            const mealName = mealList[i].MEAL_NAME;

            let ingredientName = "";
            let commaIndex = -1;
            let start = 0;

            if (ingredients !== null && ingredients.length > 0) {
                // Get all of the ingredients from the comma separated listing
                // under the variable INGREDIENTS
                while ((commaIndex = ingredients.indexOf(",", start)) > -1) {
                    
                    ingredientName = ingredients.substring(start, commaIndex);

                    outputList.push({
                        meal: mealName,
                        ingredient: ingredientName
                    });

                    start = commaIndex + 2;
                }

                ingredientName = ingredients.substring(start);

                outputList.push({
                    meal: mealName,
                    ingredient: ingredientName
                });

                commaIndex = -1;
                start = 0;
            }
           
            if (optional !== null && optional.length > 0) {
                // Get all of the ingredients from the coma separated listing
                // under the variable OPTIONAL
                while ((commaIndex = optional.indexOf(",", start)) > -1) {
                    ingredientName = optional.substring(start, commaIndex);

                    outputList.push({
                        meal: mealName,
                        ingredient: ingredientName
                    });

                    start = commaIndex + 2;
                }

                ingredientName = optional.substring(start);

                outputList.push({
                    meal: mealName,
                    ingredient: ingredientName
                });

                commaIndex = -1;
                start = 0;
            }

            if (vegetarian !== null && vegetarian.length > 0) {
                // Get a list of added or removed ingredients that would make the meal vegetarian
                // from the comma separated listing VEGETARIAN

                if (vegetarian.toLowerCase() !== "yes" && vegetarian.toLowerCase() !== "no") {
                    // In the case there is a yes or no in the vegetarian variable,
                    // there are no additional items to parse. We parse here because
                    // we determined it wasn't a yes or no instance
                    while ((commaIndex = vegetarian.indexOf(",", start)) > -1) {
                        ingredientName = vegetarian.substring(start, commaIndex);
    
                        outputList.push({
                            meal: mealName,
                            ingredient: ingredientName
                        });
    
                        start = commaIndex + 2;
                    }
    
                    ingredientName = vegetarian.substring(start);
    
                    outputList.push({
                        meal: mealName,
                        ingredient: ingredientName
                    });
                }
            }
        }
        bingbong = outputList;
        setIngredientList(outputList);
    }

    useEffect(() => {
        createIngredientList();
        console.log(bingbong);
        displayIngredientList();
    }, []);

    const displayIngredientList = () => {

    }

    
    return (
        <div className="ingredientSelector">
        </div>
    );
};
   
export default IngredientSelector;
   