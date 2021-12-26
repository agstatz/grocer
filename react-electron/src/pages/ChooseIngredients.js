/**
 * ChooseIngredients.js
 * Page where the user chooses ingredients based on
 * which meals they have chosen.
 */

import React from "react";
import NavButton from "../components/NavButton.js"

const ChooseIngredients = ({selectedMeals}) => {
    return (
        <div>
            <p class="no-click">Choose Ingredients</p>
                <NavButton text={"Back"} display={true} link={"/"} />
                <br />
                <NavButton text={"Next"} display={true} link={"/order"} />
        </div>
    )
}

export default ChooseIngredients;
