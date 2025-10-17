import { useState } from 'react'
import { Card } from './Card'
import employees from './data'


function App() {
  // Card Avatar
  return (
    <>
      {employees.map(({id, imgUrl, info}) => (
        <Card 
          key={id}
          imgUrl={imgUrl}
          profile={info}
        />
      ))}  
    </>
  )
}

export default App




