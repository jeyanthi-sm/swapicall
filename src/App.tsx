import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [swapiGetcharacters, setSwapiGetCharacters] = useState();
  const [errorMessage, setErrorMessage] = useState<string>();
  //const [swapiError, setSwapiError] = useState<string>();
  const SWAPIURL = `https://swapi.dev/api/people/?page=1`;
    useEffect(() => {
    const fetchSwapiCharacters = async () => {
      try {
        const response = await fetch(SWAPIURL);
        if (response.ok) {
        const json = await response.json();
        console.log(json.results[0].name);
        setSwapiGetCharacters(json.results[0].name);        
        }
        else if ((response.status === 418) || (response.status === 500))
        {
          const json = await response.json();
          setErrorMessage(json.detail);  
        }
      }
       catch (error) {
        if (typeof error === "string")
        {
        console.log("error");
        setErrorMessage("some message");
        }
      }
    };
    fetchSwapiCharacters();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>   SWAPI Simply Call  </h1>
      </header>
      <body> 
         <div> {swapiGetcharacters} {errorMessage} </div>
      </body>
    </div>
  );
}

export default App;
