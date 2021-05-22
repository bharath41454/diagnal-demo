import React from "react";
import { Input } from "reactstrap";

const Search = ({ handleBlur, input, setSearchActive, setInput }) => {
  return (
    <React.Fragment>
      <Input
        className='search'
        type='text'
        name='search'
        id='search'
        value={input}
        placeholder='Search...'
        onClick={() => setSearchActive(true)}
        onBlur={handleBlur}
        onChange={({ target }) => setInput(target.value)}
      />
    </React.Fragment>
  );
};

export default Search;
