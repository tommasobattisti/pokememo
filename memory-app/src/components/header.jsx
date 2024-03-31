/* import { useState } from 'react' */

export default function Header({ score, level, handleLevel, resetGame }) {

    function handleReset(){
        resetGame()
    }

    return (
        <>
        <div id='nav'>
            <h1>PokeMemo</h1>
            <div id="level-selector">
                <button disabled={(level === 0) ? false : true} onClick={() => handleLevel(1)}>Easy</button>
                <button disabled={(level === 0) ? false : true} onClick={() => handleLevel(2)}>Medium</button>
                <button disabled={(level === 0) ? false : true} onClick={() => handleLevel(3)}>Hard</button>
                {(level !== 'loading' && level !== 0) && <button onClick={handleReset}>Quit</button>}
            </div>
            <div id='scores'>
                <p>Best: {localStorage.getItem('best score') ? localStorage.getItem('best score') : 0}</p>
                <p>Current: {score}</p>
            </div>
        </div>
        </>
    )
}
