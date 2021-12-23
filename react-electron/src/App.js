import './App.css';
import React from "react";
import { SearchPanel, SearchPanelChoice, SearchPanelVariant } from "react-search-panel";
import { useEffect, useState } from "react";
import { Post } from "./sheets";

const MIN_INPUT = 3;

function App() {
  const choices = React.useState("");
  const [input, setInput] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);

  /*const handleSearchChange = (event: React.ChangeEvent) => {
      const target = event.target;
      setInput(target.value);
  };*/

  /*useEffect(() => {
    const search = async () => {
      const resultChoices: Array<SearchPanelChoice> = [];

      // Only perform a search if end user has typed a minimum number of characters
      if (input.length >= MIN_INPUT) {
        const url = `${baseUrl}${input}`;
        const response = await axios(url);
        const results = await response.data;

        // Transform results to choices.
        results.forEach((result: ShowContainer) => {
          const choice = { key: result.show.id.toString(), description: result.show.name };
          resultChoices.push(choice);
        });
      }
      setChoices(resultChoices);
      setIsLoading(false);
    };
    search();
  }, [input]);*/

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
            </div>
        </div>
    </div>
  );
}

export default App;
