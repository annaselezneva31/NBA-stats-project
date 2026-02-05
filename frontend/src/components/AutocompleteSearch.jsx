import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

const AutocompleteSearch = ({ suggestions, searchFunc, param }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorSearching, setErrorSearching] = useState("");

  const handleChange = (event) => {
    const inputVal = event.target.value;
    setInputValue(inputVal);
    setErrorSearching("");

    // Filter suggestions based on input value
    const filteredSugg = suggestions.filter((sugg) =>
      sugg.full_name.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredSuggestions(filteredSugg);
  };

  const handleSelect = (e, value) => {
    e.stopPropagation();
    setInputValue(value[param]);
    setFilteredSuggestions([]);
    setErrorSearching("");
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if input is empty
    if (!inputValue.trim()) {
      setErrorSearching("Please type a player name!");
      return;
    }

    const searching = suggestions.find((sugg) => {
      return sugg[param] === inputValue;
    });

    // Check if there is no player
    if (!searching) {
      setErrorSearching(`Player "${inputValue}" not found!`);
      setInputValue("");
      return;
    }

    setFilteredSuggestions([]);
    setInputValue("");
    setErrorSearching("");

    searchFunc(searching.id);
  };

  return (
    <Stack direction="vertical" gap={1} className="autocomplete-container">
      <Stack direction="horizontal" gap={2}>
        <input
          className="autocomplete-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type name of the player"
          list="suggestions"
        />
        {inputValue && filteredSuggestions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="autocomplete-suggestion"
                onClick={(e) => handleSelect(e, suggestion)}
              >
                {suggestion[param]}
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="primary"
          onClick={handleSearchButton}
          className="autocomplete-button"
        >
          Search
        </Button>
      </Stack>
      {errorSearching && (
        <div className="autocomplete-error">{errorSearching}</div>
      )}
    </Stack>
  );
};

export default AutocompleteSearch;
