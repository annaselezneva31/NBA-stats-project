import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const AutocompleteSearch = ({ suggestions, searchFunc, param }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const inputVal = event.target.value;
    setInputValue(inputVal);

    // Filter suggestions based on input value
    const filteredSugg = suggestions.filter((sugg) =>
      sugg.full_name.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredSuggestions(filteredSugg);
  };

  const handleSelect = (value) => {
    setInputValue(value[param]);
    setFilteredSuggestions([]);
  };

  const handleSearchButton = () => {
    const searching = suggestions.find((sugg) => {
      return sugg[param] === inputValue;
    });
    setFilteredSuggestions([]);
    searchFunc(searching.id);
  };

  return (
    <form className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type name of the player"
        list="suggestions"
      />

      <Button variant="primary" onClick={handleSearchButton}>
        Search
      </Button>

      <ul className="autocomplete-suggestions">
        {filteredSuggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="autocomplete-suggestion"
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion[param]}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default AutocompleteSearch;
