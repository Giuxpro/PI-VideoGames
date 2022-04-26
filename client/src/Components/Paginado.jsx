import React from "react";


export default function Paginado({ videoGamesPage, allVideoGames, paginado}){
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allVideoGames/videoGamesPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers?.map( number => {
                        return(
                            <li key={number}>
                                <button onClick={()=> paginado(number)}>{number}</button>
                            </li>

                        )
                    })
                }
            </ul>
        </nav>
    )
}