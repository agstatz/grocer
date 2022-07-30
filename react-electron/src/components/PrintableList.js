/**
 * PrintableList
 * Sorts list of ingredients to a grocery list
 * separated by the department the item would
 * be found in
 * 
 * @date 7/28/2022
 * @author Ashton Statz
 */

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
 
 const PrintableList = ({ingredients}) => {

    const [categorizedList, setCategorizedList] = useState([]);

    useEffect(() => {
        const getIngredientCategories = async () => {
            const response = await axios.get("./ingredientCategories.json");
            setCategorizedList(categorize(ingredients, response.data));
        }
        getIngredientCategories();


    }, [])

    // categorize(list, categories)
    // returns a list categorized by the categories passed
    // in the second parameter.
    const categorize = (list, categories) => {
        let outputList = [];
        
        for (var j = 0; j < categories.length; j++) {
            let currentCategoryName = categories[j].CATEGORY;
            for (var k = 0; k < categories[j].INGREDIENTS.length; k++) {
                for (var i = 0; i < list.length; i++) {
                    let currentIngredient = list[i].ingredient;
                    console.log(categories[j].INGREDIENTS[k]);
                    if (categories[j].INGREDIENTS[k] === currentIngredient) {
                        outputList.push({
                                            ingredient: currentIngredient,
                                            category: currentCategoryName
                                        });
                    }
                }

            }
        }

        console.log(outputList);
        console.log("output List ^");
        return outputList;
    }

    return (
        <>{ ingredients !== undefined ? 
        ingredients.map((ingredient) => {
            return (
                <li>
                    {ingredient.ingredient}
                </li>
            )
        }) : <></>
        }</>
    )
 }
   
 export default PrintableList;
   