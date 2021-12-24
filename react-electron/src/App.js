import './App.css';
import React from "react";
import { SearchPanel, SearchPanelChoice, SearchPanelVariant } from "react-search-panel";
import { useEffect, useState } from "react";
import axios from "axios";

const MIN_INPUT = 3;
const DEV_MODE = true;

// The URL here plugs in to the https://sheet.best API which allows for a simple way
// to use a google sheet as a backend. Replace as needed
const url = 'https://sheet.best/api/sheets/279dbfb9-3342-4cf3-a733-6734a6d8a368';

const App = () => {
  const [choices, setChoices] = React.useState("");
  const [input, setInput] = React.useState("");
  const [mealData, setMealData] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);

  useEffect(() => {
    // There are limited calls to the google sheets API, so in the case that
    // we are in development mode, just use a local testing file.
    if (DEV_MODE) {
        const getDevDatabase = async () => {
            const response = await axios.get("./developmentDatabase.json");
            setMealData(response.data);
            console.log("Called useEffect 1");
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

  useEffect(() => {
    console.log("updated input");
    const search = async () => {
        if (input.length >= MIN_INPUT) {
            setChoices(getSearchResults(input));
        }
    };
    search();
  }, [input]);

  const getSearchResults = ({search_str}) => {
      let matchList = [];
      var i = 0;
      for (i = 0; i < mealData.length; i++) {
        if (mealData[i].MEAL_NAME.startsWith(search_str)) {
            matchList.push({
                key: mealData[i].ID,
                description: mealData[i].MEAL_NAME
            })
        }
      }
      return matchList
  }

  
  return (
    <div className="App">
        <title>grocer</title>
        <div class="basic-container">
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
                <button>Next</button>
            </div>
        </div>
        <p class="footnote">Grocer 2021, created by Ashton Statz</p>
    </div>
  );
};

export default App;
