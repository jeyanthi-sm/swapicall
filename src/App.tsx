import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [swapiGetcharacters, setSwapiGetCharacters] = useState("");
  const SWAPIURL = `https://swapi.dev/api/people/`;
    useEffect(() => {
    const fetchSwapiCharacters = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=1`);
        if (response.ok) {
        const json = await response.json();
        console.log(json.results[0].name);
        setSwapiGetCharacters(json.results[0].name);
        
        }
      } catch (error) {
        console.log("error");
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
         <div> {swapiGetcharacters} </div>
      </body>
    </div>
  );
}

export default App;
