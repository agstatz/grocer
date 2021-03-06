/**
 * IngredientSelector
 * Modular display component to allow the user
 * to choose the ingredients they would need
 * 
 * @date 7/15/2022
 * @author Ashton Statz
 */
import React, { useEffect, useState } from  'react';
import { Popup, Button } from 'semantic-ui-react';

const IngredientSelector = ({mealList, handleChange}) => {
    
    const [ingredientList, setIngredientList] = useState([]);           // the final resulting list of selected foods to be purchased
    const [augmentedMealList, setAugmentedMealList] = useState([]);     // the list of meals and their respective ingredients

    // initialize both ingredientList and augmentedMealList
    useEffect(() => { 
        updateIngredientsList(createAugmentedMealList());
    }, []);

    // createIngredientList()
    // constructs the initial ingredientList which
    // is later passed on to other pages to indicate which
    // ingredients have been chosen by the user
    const createIngredientList = () => {
        let outputList = [];
        
        for (var i = 0; i < mealList.length; i++) {
            
            let vegetarian = getVegetarian(i);
            let vegIsEditable = getVegIsEditable(i);
            let vegActionList = null;
            if (vegIsEditable) {
                vegActionList = getVegActionList(i);
            }
            let ingredientList = getAugmentedIngredients(i, vegActionList);
            
            outputList.push({
                key: i,
                meal: mealList[i].MEAL_NAME,
                ingredients: ingredientList,
                vegetarian: vegetarian,
                vegIsEditable: vegIsEditable,
            })
        }

        setIngredientList(outputList);
    }

    // createAugmentedMealList()
    // constructs the augmentedMealList from mealList
    // the objects are better formed to facilitate their
    // display and modification on the ingredient selector
    const createAugmentedMealList = () => {

        let outputList = [];
        
        for (var i = 0; i < mealList.length; i++) {
            
            let vegetarian = getVegetarian(i);
            let vegIsEditable = getVegIsEditable(i);
            let vegActionList = null;
            if (vegIsEditable) {
                vegActionList = getVegActionList(i);
            }
            let ingredientList = getAugmentedIngredients(i, vegActionList);
            
            outputList.push({
                key: i,
                meal: mealList[i].MEAL_NAME,
                ingredients: ingredientList,
                vegetarian: vegetarian,
                vegIsEditable: vegIsEditable,
            })
        }

        setAugmentedMealList(outputList);
        return outputList;
    }

    // getVegActionList(index)
    // returns a list of respective ingredients and whether
    // they should be removed or added to make a dish vegetarian
    const getVegActionList = (index) => {
        if (mealList[index].VEGETARIAN.length === 0 ||
            mealList[index].VEGETARIAN.length === undefined) {
            return null;
        }

        let ingredients = mealList[index].VEGETARIAN;
        let outputList = [];
        let ingredientName = "";
        let commaIndex = -1;
        let start = 0;

        while ((commaIndex = ingredients.indexOf(",", start)) > -1) {
            
            ingredientName = ingredients.substring(start, commaIndex);

            outputList.push({
                ingredient: ingredientName.replace("+", "").replace("-", "").trim(),
                action: ingredientName.substring(0, 1) === "-" ? "remove" : "add",
            });

            start = commaIndex + 2;
        }

        ingredientName = ingredients.substring(start);

        outputList.push({
            ingredient: ingredientName.replace("+", "").replace("-", "").trim(),
            action: ingredientName.substring(0, 1) === "-" ? "remove" : "add",
        });

        commaIndex = -1;
        start = 0;

        return outputList;
    }

    // getVegetarian(index)
    // returns default vegetarian value for a meal based on
    // the entry in mealList VEGETARIAN property
    const getVegetarian = (index) => {
        if (mealList[index].VEGETARIAN.toLowerCase() === "yes") {
            return true;
        }

        return false;
    }

    // getVegIsEditable(index)
    // returns true if the meal is not by default a vegetarian meal
    // but can be made into a vegetarian meal
    const getVegIsEditable = (index) => {
        const veg = mealList[index].VEGETARIAN.toLowerCase();
        if (veg === "yes" || veg === "no") {
            return false;
        }

        return true;
    }

    // getAugmentedIngredients(index, vegActionList)
    // returns an array of all ingredients, optional and not optional,
    // including vegetarian addons and their respective actions to make
    // the meal vegetarian
    const getAugmentedIngredients = (index, vegActionList) => {
        let ingredientArray = getIngredientsAsArray(index, false, vegActionList);
        let optionalArray = getIngredientsAsArray(index, true, vegActionList);
        if (vegActionList) {
            let vegIngredientArray = getIngredientsAsArray(index, undefined, vegActionList);
            optionalArray = combineLists(optionalArray, vegIngredientArray);
        }
        
        return combineLists(ingredientArray, optionalArray);
    }

    // combineLists(list1, list2)
    // Combines list1 and list2 into a single list and returns
    // that list. Updates keys to be enumerated correctly
    const combineLists = (list1, list2) => {
        if (list1 && !list2) {
            return list1;
        }

        if (!list1 && list2) {
            return list2;
        }

        if (!list1 && !list2) {
            return null;
        }

        let count = list1.length;
        for (var i = 0; i < list2.length; i++) {
            list2[i].key = count;
            count++;
        }

        return list1.concat(list2);
    }

    // getIngredientsAsArray(index, isOptional, vegActionList)
    // Given a meal's index parse the comma separated string
    // and return an array of ingredients
    const getIngredientsAsArray = (index, isOptional, vegActionList) => {
        var outputList = [];
        let ingredientString = "";
        let ingredientName = "";
        let commaIndex = -1;
        let start = 0;
        let count = 0;

        if (isOptional === true ) {
            ingredientString = mealList[index].OPTIONAL;
        } else if (isOptional === false) {
            ingredientString = mealList[index].INGREDIENTS;
        } else {
            ingredientString = mealList[index].VEGETARIAN;
        }

        if (ingredientString === null || ingredientString.length === 0) {
            return null;
        }

        // Get all of the ingredients from the comma separated listing
            
        while ((commaIndex = ingredientString.indexOf(",", start)) > -1) {
            
            ingredientName = ingredientString.substring(start, commaIndex).trim();

            if (isOptional === undefined) {
                if (ingredientName.includes("-")) {
                    start = commaIndex + 2;
                    count++;
                    continue;
                }

                ingredientName = ingredientName.replace("+", "");
            }

            let action = null;

            if (vegActionList) {
                for (var i = 0; i < vegActionList.length; i++) {
                    if (vegActionList[i].ingredient === ingredientName) {
                        action = vegActionList[i].action;
                        break;
                    }
                }
            }

            outputList.push({
                key: count,
                ingredient: ingredientName,
                checked: !isOptional,
                optional: isOptional,
                vegAction: action,
                hidden: isOptional === undefined ? true : false,
            });

            start = commaIndex + 2;
            count++;
        }

        ingredientName = ingredientString.substring(start).trim();

        if (isOptional === undefined) {
            if (ingredientName.includes("-")) {
                return outputList;
            }

            ingredientName = ingredientName.replace("+", "");
        }

        let action = null;

        if (vegActionList) {
            for (var i = 0; i < vegActionList.length; i++) {
                if (vegActionList[i].ingredient === ingredientName) {
                    action = vegActionList[i].action;
                }
            }
        }

        outputList.push({
            key: count,
            ingredient: ingredientName,
            checked: !isOptional,
            optional: isOptional,
            vegAction: action,
            hidden: isOptional === undefined ? true : false,
        });

        commaIndex = -1;
        start = 0;
        
        return outputList;
    }

    // updateIngredientsList(meals)
    // given a list of meals, outputs a list of solely the ingredients
    // necessary for populating an order/grocery list into the variable
    // ingredientList
    const updateIngredientsList = (meals) => {
        let outputList = [];

        for (let i = 0; i < meals.length; i++) {
            if (!meals[i].ingredients) {
                return;
            }

            for (let j = 0; j < meals[i].ingredients.length; j++) {
                if (meals[i].ingredients[j].checked &&
                    !meals[i].ingredients[j].hidden) {
                    outputList.push({
                        ingredient: meals[i].ingredients[j].ingredient,
                        meal: meals[i].meal,
                    })
                }
            }
        }

        setIngredientList(outputList);
        console.log(outputList);
        handleChange(outputList);
    }

    // handleCheckbox()
    // Handles toggling a checkbox for selecting an ingredient
    const handleCheckbox = (e) => {
        let indices = e.target.id.split(".")
        let outputList = [...augmentedMealList];
        outputList[indices[1]].ingredients[indices[0]].checked = 
            !outputList[indices[1]].ingredients[indices[0]].checked;
        
        setAugmentedMealList(outputList);
        updateIngredientsList(outputList);
    }

    // handleVegCheckbox()
    // Handles toggling of the vegetarian checkbox 
    // for each meal
    const handleVegCheckbox = e => {
        let indices = e.target.id.split(".");
        let index = indices[0];
        let vegetarian = indices[1];
        let vegIsEditable = indices[2];

        if (vegIsEditable === 'false' || vegIsEditable === undefined ||
            vegIsEditable === null) {
            return;
        }
        
        let outputList = [...augmentedMealList];
        console.log(outputList[index].ingredients);
        for (let i = 0; i < outputList[index].ingredients.length; i++) {
            if (outputList[index].ingredients[i].vegAction === null) {
                continue;
            }

            if (vegetarian === "false") {
                if (outputList[index].ingredients[i].vegAction === "add") {
                    outputList[index].ingredients[i].hidden = false;
                    outputList[index].ingredients[i].checked = true;
                }
    
                if (outputList[index].ingredients[i].vegAction === "remove") {
                    outputList[index].ingredients[i].hidden = true;
                    outputList[index].ingredients[i].checked = false;
                }
            }

            if (vegetarian === "true") {
                if (outputList[index].ingredients[i].vegAction === "add") {
                    outputList[index].ingredients[i].hidden = true;
                    outputList[index].ingredients[i].checked = false;
                }
    
                if (outputList[index].ingredients[i].vegAction === "remove") {
                    outputList[index].ingredients[i].hidden = false;
                    outputList[index].ingredients[i].checked = true;
                }
            }
            
        }

        outputList[index].vegetarian = vegetarian === "false" ? true : false;
        setAugmentedMealList(outputList);
        updateIngredientsList(outputList);
    }
    
    return (
        <div className="ingredientSelector">
            <table className="ui padded small table">
                <thead>
                    <tr><th colSpan="3">Select the ingredients you need</th></tr>
                </thead>
                <tbody>
                    {
                    augmentedMealList.map((item, index) => {
                        return (
                            <>
                            <tr>
                                <td colSpan="2">
                                    {item.meal}
                                </td>
                                <td>
                                    { !item.vegIsEditable ? <Popup content="Vegetarian status cannot be changed" trigger={<div class="ui center aligned checkbox">
                                        <input type="checkbox" checked={item.vegetarian} id={item.key + "." + item.vegetarian + "." + item.vegIsEditable} onChange={handleVegCheckbox}></input>
                                        <label> Vegetarian</label>
                                    </div>}/> : <div class="ui center aligned checkbox">
                                        <input type="checkbox" checked={item.vegetarian} id={item.key + "." + item.vegetarian + "." + item.vegIsEditable} onChange={handleVegCheckbox}></input>
                                        <label> Vegetarian</label>
                                    </div>}
                                    
                                </td>
                            </tr> 
                                {
                                    item.ingredients.map((ingredient) => {
                                        return (
                                            <>
                                            { !ingredient.hidden ? <tr>
                                                <td>
                                                    <div class="ui fitted checkbox">
                                                        <input type="checkbox" checked={ingredient.checked} id={ingredient.key + "." + item.key} onChange={handleCheckbox}></input><label></label>
                                                    </div>
                                                </td>
                                                <td>{ingredient.ingredient}</td>
                                                <td></td>
                                            </tr> : <></>}
                                            
                                            </>
                                            
                                        )
                                    })
                                }
                            </>
                        )
                    })}
                </tbody>
            </table>
            <br />
        </div>
    );
};
   
export default IngredientSelector;
   