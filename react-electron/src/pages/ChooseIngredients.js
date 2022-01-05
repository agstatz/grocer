/**
 * ChooseIngredients.js
 * Page where the user chooses ingredients based on
 * which meals they have chosen.
 * 
 * @date 12/27/2021
 * @author Ashton Statz
 */

import React from "react";
import { NavButton, IngredientSelector } from "../components";

const ChooseIngredients = ({mealList}) => {
    
    return (
        <div>
            <h1>grocer</h1>
            <p class="no-click">Choose Ingredients</p>
            <IngredientSelector mealList={mealList} />
            <div class="ui horizontal list">
            <div class="item">
                <NavButton text={"Back"} display={true} link={"/"} />
            </div>
            <div class="item">
                <NavButton text={"Next"} display={true} link={"/order"} />
            </div>
            </div>
        </div>
    )
}

export default ChooseIngredients;