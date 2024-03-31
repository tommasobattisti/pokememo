import { useState, useEffect } from 'react'
import '../style/App.css'
import Header from './header.jsx'
import Board from './board.jsx'



function App() {
  const [ score, setScore ] = useState(0)
  const [ level, setLevel ] = useState(0)
  const [ data, setData ] = useState(false)
  

  useEffect(() => {

    if (!localStorage.getItem('best score')){
      localStorage.setItem('best score', '0')
    }


    const fetchData = () => {
        let pokemons = [];
        const fetchPokemonData = (i) => {
            let url = 'https://pokeapi.co/api/v2/pokemon/' + i.toString();
            return fetch(url, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    let pokeImage = data.sprites.other.dream_world.front_default;
                    let pokeName = data.name;
                    let pokeId = data.id;
                    pokemons.push({ image: pokeImage, name: pokeName, id: pokeId });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle error here (e.g., display an error message, retry fetching, etc.)
                });
        };

        // Create an array of promises for each fetch request
        const fetchPromises = [];
        for (let i = 1; i < 33; i++) {
            fetchPromises.push(fetchPokemonData(i));
        }
        // Execute all fetch requests concurrently using Promise.all
        Promise.all(fetchPromises)
            .then(() => {
                setData(pokemons);
            });
    };

    fetchData();
  }, []);


  function handleLevel(val) {
    setLevel(val)
  }

  function resetGame() {
    setLevel(0)
    setScore(0)
    const best = localStorage.getItem('best score')
    if (score > best){
      let x = score.toString()
      localStorage.setItem('best score', x)
    }
  }

  function addScore(){
    setScore(score + 1)
  }


  return (
    <>
      <Header score={score}  level={data ? level : 'loading'} handleLevel={handleLevel} resetGame={resetGame} />

      {!data && level === 0 ?
      <p id='loading-p'>Loading ...</p>
      : data && level === 0 ?
      <p id="select-level-p">Select a level in the top bar to play</p>
      : null }

      {level !== 0 && <Board resetGame={resetGame} addScore={addScore} level={level} pokemonArray={level === 1 ? data.slice(0, 12) : level === 2 ? data.slice(0, 24) : data.slice(0, 32) } />}
    </>
  )
}

export default App
