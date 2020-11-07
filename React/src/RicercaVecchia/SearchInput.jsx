import React from "react";

import { Input, InputLabel, InputGroup } from "../comune/input";

const SearchInput = ({ place, setPlace }) => {
  return (
    <InputGroup>
      <InputLabel htmlFor="place">where</InputLabel>
      <Input
        id="place"
        type="text"
        name="place"
        value={place}
        placeholder="Anywhere"
        onChange={setPlace}
      />
    </InputGroup>
  );
};

export default SearchInput;
