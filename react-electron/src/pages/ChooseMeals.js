/**
 * ChooseMeals.js
 * Page where the user chooses their meals
 * 
 */
import React from "react";
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import { useEffect, useState } from "react";
import axios from "axios";
import NextButton from "../components/NextButton.js";

// Set DEV_MODE to true to use a local database
const DEV_MODE = true;
const MIN_RESULT = 1;

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed
const url = 'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const ChooseMeals = () => {
    const [choices, setChoices] = React.useState("");
    const [input, setInput] = React.useState("");
    const [mealData, setMealData] = React.useState("");
    const [displayButton, setDisplayButton] = React.useState(false);
    const [selectedChoices, setSelectedChoices] = useState(choices);
  
    useEffect(() => {
      // There are limited calls to the google sheets API, so in the case that
      // we are in development mode, just use a local testing file.
      if (DEV_MODE) {
          const getDevDatabase = async () => {
              const response = await axios.get("./developmentDatabase.json");
              setMealData(response.data);
          }
          getDevDatabase();
      } else {
          const getDatabase = async () => {
              const response = await axios.get(url);
              setMealData(response.data);
          };
          getDatabase();
      }
      
    }, [])

    const handleNext = () => {
        console.log("chungus");
    }
  
    useEffect(() => {
  
      // Finds any meals in meal data that match input
      const getSearchResults = () => {
          let matchList = [];
          var i = 0;
          for (i = 0; i < mealData.length; i++) {
            if (mealData[i].MEAL_NAME.toLowerCase().includes(input.toLowerCase())) {
                matchList.push({
                    key: mealData[i].ID,
                    description: mealData[i].MEAL_NAME
                })
            }
          }
  
          return matchList
      }
  
      const search = async () => {
          setChoices(getSearchResults());
      };
      search();
    }, [input]);
  
    // When there are selected meals, give the user the option to move on
    // else, we do not let the user move to the next page.
    useEffect(() => {
      if (selectedChoices.length > 0) {
          setDisplayButton(true);
      } else {
          setDisplayButton(false);
      }
          
    }, [selectedChoices])
  
    
    return (
        <div>
            <div>
                <h1>grocer</h1>
                <p class="no-click">Search meals, order ingredients fast and simple.</p>
            </div>
            <div>
                
                <SearchPanel 
                    choices={choices}
                    chips
                    maximumHeight={250}
                    onChange={event => setInput(event.target.value)}
                    onSelectionChange={setSelectedChoices}
                    placeholder="Search"
                    variant={SearchPanelVariant.checkbox}
                    shadow
                    selectedChoices={selectedChoices}
                    value={input}
                    width={'calc(300 + 10vmin)'}
                />
                <br />
                <div><NextButton display={displayButton} onClick={handleNext}/></div>
            </div>
        </div>
    );
  };
  
  export default ChooseMeals;
  