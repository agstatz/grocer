import logo from './logo.svg';
import './App.css';
import React from "react";
import { SearchPanel } from "react-search-panel";
import { useState } from "react";

function App() {
  const choices = React.useState("");
  const [input, setInput] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);

  return (
    <div className="App">
        <div>
            <h1>grocer</h1>
            <p>Search meals for the week to get a recipe</p>
        </div>
        <div class="basic_container">
            <SearchPanel 
                choices={choices}
                onChange={event => setInput(event.target.value)}
                onSelectionChange={setSelectedChoices}
                placeholder="Search"
                selectedChoices={selectedChoices}
                value={input}
            />
        </div>
    </div>
  );
}

export default App;
