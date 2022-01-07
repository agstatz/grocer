/**
 * IngredientSelector
 * Modular display component to allow the user
 * to choose the ingredients they would need
 * 
 * @date 1/6/2022
 * @author Ashton Statz
 */
import React, { useEffect, useState } from 'react';

const IngredientSelector = ({mealList}) => {
    
    const [ingredientList, setIngredientList] = useState([]);       // the list of ingredients parsed out of mealList
    const [displayList, setDisplayList] = useState([]);             // the list holding react elements to display ingredients
    const [selectedVegList, setSelectedVegList] = useState([]);     // the list of the meals and whether the user wants them vegetarian

    useEffect(() => {
        createIngredientList();
        createSelectedVegList();
    }, [displayList]);


    // given a meal name, we return whether the meal on its own is
    // a vegetarian meal or not
    const isVegetarian = mealName => {
        for (var i = 0; i < mealList.length; i++) {
            if (mealName === mealList[i].MEAL_NAME) {
                if (mealList[i].VEGETARIAN.toLowerCase() === "yes") {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    // checks selectedVegList to determine whether the given meal
    // has vegetarian status, which helps display certain options
    // for a vegetarian version of the meal
    const isSelectedVeg = mealName => {
        /*for (var i = 0; i < mealList.length; i++) {
            if (mealName === selectedVegList[i].meal) {
                if (selectedVegList[i].veg) {
                    return true;
                } else {
                    return false;
                }
            }
        }*/
        return false;
    }

    // Handles toggling of the checkboxes of ingredients
    const handleCheckbox = index => e => {
        let newArr = [...ingredientList];
        newArr[index] = {
            meal: newArr[index].meal,
            ingredient: newArr[index].ingredient,
            checked: !newArr[index].checked,
        }

        setIngredientList(newArr);
    }

    // Handles toggling of the vegetarian checkbox 
    // for each meal
    const handleVegCheckbox = meal => {
        console.log("handling veg checkbox");
         if (isVegetarian(meal)) {
             // do nothing
         } else {
             console.log("make it veg");
             let newArr = [...selectedVegList];
             for (let i = 0; i < newArr.length; i++) {
                 if (newArr[i].meal === meal) {
                    newArr[i] = {
                        meal: meal,
                        veg: !newArr[i].veg
                    };
                    break;
                 }
             }
         }
    }

    // Given the meal data, output a well-formatted
    // list of ingredients and the respective meals
    // that they belong to
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
                        ingredient: ingredientName,
                        checked: true
                    });

                    start = commaIndex + 2;
                }

                ingredientName = ingredients.substring(start);

                outputList.push({
                    meal: mealName,
                    ingredient: ingredientName,
                    checked: true
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
                        ingredient: ingredientName,
                        checked: false
                    });

                    start = commaIndex + 2;
                }

                ingredientName = optional.substring(start);

                outputList.push({
                    meal: mealName,
                    ingredient: ingredientName,
                    checked: false
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
                    let vegAction = ""

                    while ((commaIndex = vegetarian.indexOf(",", start)) > -1) {
                        ingredientName = vegetarian.substring(start, commaIndex);

                        if (ingredientName.startsWith("+")) {
                            vegAction = "add";
                        } else {
                            vegAction = "remove";
                        }

                        ingredientName = ingredientName.substring(1);
    
                        outputList.push({
                            meal: mealName,
                            ingredient: ingredientName,
                            checked: true,
                            vegAction: vegAction
                        });
    
                        start = commaIndex + 2;
                    }
    
                    ingredientName = vegetarian.substring(start);

                    if (ingredientName.startsWith("+")) {
                        vegAction = "add";
                    } else {
                        vegAction = "remove";
                    }

                    ingredientName = ingredientName.substring(1);
    
                    outputList.push({
                        meal: mealName,
                        ingredient: ingredientName,
                        checked: true,
                        vegAction: vegAction
                    });
                }
            }
        }
        setIngredientList(outputList);
    }

    // Outputs a well-formatted list of meals
    // and whether the user wants them vegetarian
    const createSelectedVegList = () => {
        let outputList = [];
        for (var i = 0; i < mealList.length; i++) {
            outputList.push({
                meal: mealList[i].MEAL_NAME,
                veg: isVegetarian(mealList[i].MEAL_NAME)
            })
        }
        setSelectedVegList(outputList);
    }

    // Build the table that displays all of the ingredients
    // from the ingredient list
    const displayIngredientList = (ingredientList) => {
        let ingredientDisplayList = [];
        
        if (ingredientList !== null) {
            for (let i = 0; i < ingredientList.length; i++) {
                
                // Create a header for the meal
                if (i === 0 || ingredientList[i].meal !== ingredientList[i - 1].meal) {
                    ingredientDisplayList.push(
                        <tr>
                            <td colSpan="2">
                                {ingredientList[i].meal}
                            </td>
                            <td>
                                <div class="ui center aligned checkbox">
                                    <input type="checkbox" checked={isSelectedVeg(ingredientList[i].meal)} onChange={handleVegCheckbox(ingredientList[i].meal)}></input>
                                <label> Vegetarian</label>
                                </div>
                            </td>
                        </tr>
                    );
                }

                if (isSelectedVeg(ingredientList[i].meal)) {
                    if (ingredientList[i].vegAction !== undefined) {

                    }
                }

                ingredientDisplayList.push(
                    <tr>
                    <td>
                        <div class="ui fitted checkbox">
                        <input type="checkbox" checked={ingredientList[i].checked}
                            onChange={handleCheckbox(i)}></input><label></label>
                        </div>
                    </td>
                    <td>{ingredientList[i].ingredient}</td>
                    <td></td>
                    </tr>);
            }
        }

        return ingredientDisplayList;
    }
    
    return (
        <div className="ingredientSelector">
            <table class="ui padded single line table">
                <thead>
                    <tr><th></th>
                    <th>Select the ingredients you need</th>
                    <th></th></tr>
                </thead>
                <tbody>
                    {displayIngredientList(ingredientList)}
                </tbody>
            </table>
            <br />
        </div>
    );
};
   
export default IngredientSelector;
   