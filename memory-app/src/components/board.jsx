import { useState } from 'react'


function PokeCard({ cardObject, handleShuffle, data, handleSelection }) {

    function handleClick(){
        handleSelection(cardObject.id)
        handleShuffle(data)
    }

    return (
        <div onClick={handleClick} className="card"><div className='card-image-container'><img src={cardObject.image}></img></div><p>{cardObject.name}</p></div>
    )
}


export default function Board({ pokemonArray, addScore, resetGame }) {
    const [ clicked, setClicked ] = useState([])
    const [ shuffledData, setShuffledData ] = useState( pokemonArray )


    function handleShuffle(arr) {
        const newArr = [...arr]; // Create a copy of the array
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        setShuffledData(newArr);
    }

    function handleSelection(id){
        let current = clicked;
        if(current.includes(id)){
            setClicked([])
            resetGame()
        } else {
            current.push(id)
            setClicked(current)
            addScore()
        }
    }

    return (
        <>
        <section id='board'>
            {shuffledData.map((pokemonInfo) => { return <PokeCard handleSelection={handleSelection} handleShuffle={handleShuffle} data={shuffledData} cardObject={pokemonInfo} key={pokemonInfo.id} />})}
        </section>

        </>
    )
}
