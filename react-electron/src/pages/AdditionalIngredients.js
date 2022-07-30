/**
 * AdditionalIngredients.js
 * Page where the user adds other ingredients
 * not included on their list
 * 
 * @date 7/28/2022
 * @author Ashton Statz
 */

import React from "react";
import { useState, useReducer } from "react"; 
import { NavButton, NewIngredient } from "../components";

const AdditionalIngredients = ({ingredients, handleChange}) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [localIngredientList, setLocalIngredientList] = useState(ingredients);

    const handleListChange = (newList) => {
        setLocalIngredientList(newList);
        console.log(newList);
        handleChange(newList);
        forceUpdate();
    }
    
    return (
        <div>
            <h1>grocer</h1>
            <table className="ui padded small table">
                <thead>
                    <tr><th>Currently Selected Ingredients</th></tr>
                </thead>
                <tbody>
                    {
                        localIngredientList.map((ingredient) => {
                            return (
                                <tr>
                                    <td colSpan="1">
                                        {ingredient.ingredient}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <NewIngredient ingredients={ingredients} handleChange={handleListChange} />
            <div className="ui horizontal list">
            <div className="item">
                <NavButton text={"Back"} display={true} link={"/ingredients"} />
            </div>
            <div className="item">
                <NavButton text={"Next"} display={true} link={"/decision"} />
            </div>
            </div>
        </div>
    )
}

export default AdditionalIngredients;