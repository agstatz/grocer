/**
 * NewIngredient.js
 * Widget that handles adding a new ingredient
 * 
 * @date 5/22/2022
 * @author Ashton Statz
 */

 import { React, useState } from "react";
 import { Button, Segment, Input } from "semantic-ui-react";
 import { NavButton, AddMoreIngredients } from "../components";
 
 const NewIngredient = ({handleChange}) => {

    const [mode, setMode] = useState("empty");
    const [ingredient, setIngredient] = useState("");

    const changeMode = () => {
        setMode("not empty");
    }

    const updateIngredient = e => {
        setIngredient(e.target.value);
    }
     
    return (
        <>
        {
            mode === "empty" ?
            <Button icon='add' onClick={changeMode}/>
            : <Segment inverted padded>
                <Input placeholder='Add an Ingredient' onChange={updateIngredient}/>
            </Segment>
        }
        </>
    )
 }
 
 export default NewIngredient;