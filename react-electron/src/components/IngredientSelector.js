/**
 * IngredientSelector
 * Modular display component to allow the user
 * to choose the ingredients they would need
 * 
 * @date 12/27/2021
 * @author Ashton Statz
 */
import React from 'react';
import useState from 'react';

const IngredientSelector = ({mealList}) => {

    const [ingredientList, setIngredientList] = useState("");
    
    // Given the meal data, output a well-formatted
    // list of ingredients and the respective meals
    // that they belong to.
    const createIngredientList = () => {
        let outputList = [];

        for (let i = 0; i < mealList.length; i++) {
            const ingredients = mealList[i].INGREDIENTS;
            const optional = mealList[i].OPTIONAL;
            const mealName = mealList[i].MEAL_NAME;
            let ingredientName = "";
            let commaIndex = -1;
            let start = 0;

            if (ingredients.length > 0) {
                // Get all of the ingredients from the comma separated listing
                // under the variable INGREDIENTS
                while ((commaIndex = ingredients.indexOf(",", start)) > -1) {
                    
                    ingredientName = ingredients.substring(start, commaIndex - 1);

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
           
            if (optional.length > 0) {
                // Get all of the ingredients from the coma separated listing
                // under the variable OPTIONAL
                while ((commaIndex = optional.indexOf(",", start)) > -1) {
                    ingredientName = optional.substring(start, commaIndex - 1);

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

            /*if () {

            }*/

           
        }

        setIngredientList(outputList);
    }

    return (
        <div className="ingredientSelector">
            Hello
        </div>
    );
};
   
export default IngredientSelector;
   