import './App.css';
import React from "react";
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import { useState } from "react";

function App() {
  const choices = React.useState("");
  const [input, setInput] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);
  


  return (
    <div className="App">
        <title>grocer</title>
        <div class="basic-container">
            <div>
                <h1>grocer</h1>
                <p>Search meals, order ingredients fast and simple.</p>
            </div>
            <div>
                <SearchPanel 
                    choices={choices}
                    onChange={event => setInput(event.target.value)}
                    onSelectionChange={setSelectedChoices}
                    placeholder="Search"
                    variant={SearchPanelVariant.checkbox}
                    shadow
                    selectedChoices={selectedChoices}
                    value={input}
                    width={'calc(300 + 10vmin)'}
                />
            </div>
        </div>
    </div>
  );
}

export default App;
