import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const SearchStatus = ({users}) => {
  const handlePhrase = (number) => {
    return number !== 0
    ? <h1 style={{fontSize: '24px'}} className='badge bg-primary m-1'>{number} человек тусанет с тобой сегодня</h1>
    : <h1
      style={{fontSize: '24px'}}
      className='badge bg-danger m-1'
      >
        Hикто не тусанет с тобой сегодня
    </h1>
  }

  return <>
    {handlePhrase(users.length)}
  </>
}

export default SearchStatus