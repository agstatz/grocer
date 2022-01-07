/**
 * Decision.js
 * Page where the user chooses to either print out
 * their grocery list or to try and order it from
 * a grocery store using their API
 * 
 * @date 1/6/2022
 * @author Ashton Statz
 */

 import React from "react";
 import { NavButton } from "../components";
 
 const Decision = ({ingredientList}) => {
     
     return (
         <div>
             <h1>grocer</h1>
             <p class="no-click">OK: What will it be?</p>
             <div class="ui horizontal list">
                <div class="item">
                    <NavButton text={"Back Home"} display={true} link={"/"} />
                </div>
                <div class="item">
                    <NavButton text={"Print Grocery List"} display={true} link={"/printGrocery"} />
                </div>
                <div class="item">
                    <NavButton text={"Order Groceries"} display={true} link={"/orderGrocery"} />
                </div>
             </div>
         </div>
     )
 }
 
 export default Decision;