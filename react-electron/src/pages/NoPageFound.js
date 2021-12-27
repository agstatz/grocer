/**
 * NoPageFound.js
 * Page where user is directed if they access some
 * page that does not exist
 * 
 * @date 12/27/2021
 * @author Ashton Statz
 */
import React from "react";
import NavButton from "../components/NavButton.js"; 

const NoPageFound = () => {
    
    return (
        <div className="NoPageFound">
            <h1>grocer</h1>
            <p>No Page Found</p>
            <NavButton text={"Return Home"} link={"/"} display={true}/>
        </div>
    );

}

export default NoPageFound;