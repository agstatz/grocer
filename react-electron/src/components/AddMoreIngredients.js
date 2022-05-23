/**
 * AddMoreIngredients.js
 * Component where the user adds other ingredients
 * not included on their list
 * 
 * @date 5/22/2022
 * @author Ashton Statz
 */

 import React from "react";
 import { Button } from "semantic-ui-react";
 import { NewIngredient } from "../components";
 
 const AddMoreIngredients = ({ingredients, handleChange}) => {

     return (
         <div>
            <NewIngredient ingredients={ingredients} handleChange={handleChange} />
            <div><br></br></div>
         </div>
     )
 }
 
 export default AddMoreIngredients;