import React from "react";

const Search = (props) => {
  return (
    <div>
      Find countries: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default Search