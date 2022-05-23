/**
 * AdditionalIngredients.js
 * Page where the user adds other ingredients
 * not included on their list
 * 
 * @date 5/22/2022
 * @author Ashton Statz
 */

 import React from "react";
 import { NavButton, AddMoreIngredients } from "../components";
 
 const AdditionalIngredients = ({ingredients, handleChange}) => {
     
     return (
         <div>
             <h1>grocer</h1>
             <p class="no-click">Add Other Ingredients</p>
             <AddMoreIngredients />
             <div class="ui horizontal list">
             <div class="item">
                 <NavButton text={"Back"} display={true} link={"/ingredients"} />
             </div>
             <div class="item">
                 <NavButton text={"Next"} display={true} link={"/decision"} />
             </div>
             </div>
         </div>
     )
 }
 
 export default AdditionalIngredients;