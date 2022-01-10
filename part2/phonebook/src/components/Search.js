import React from "react"
 
// Search component
const Search = ({value, onChange}) => {  
  return (
    <div>
      search a name<input value={value} onChange={onChange}/>
    </div>
  )
}

export default Search