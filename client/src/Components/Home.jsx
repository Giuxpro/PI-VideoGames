import React from "react"
import { useState,useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import { getVideoGame, getGenres } from "../actions"
import Card from "./Card"
import Paginado from "./Paginado";
import GenreSelectOption from "./Genres"


export default function Home(){
    const dispatch = useDispatch()
    const allVideoGames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);

    //Seteo el paginado aqui y luego aplico la logica en el componente Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPage, setVideoGamesPage] = useState(15);
    const indexOfLastVideoGame = currentPage * videoGamesPage;
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPage;
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)


    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    useEffect( ()=>{
        dispatch(getGenres())
    },[dispatch])

    useEffect( ()=>{
        dispatch(getVideoGame());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideoGame())
    }

    return(
        <div>
            <Link to="/videogames">Crear VideoGame</Link>
            <h1>Giusepp Game</h1>
            <button onClick={(e)=>handleClick(e)}>
                Cargar VideoGame
            </button>
            <div>
                <Paginado
                    videoGamesPage={videoGamesPage}
                    allVideoGames={allVideoGames.length}
                    paginado={Paginado}
                />
            </div>
            <div>
                <select>
                    <option>Alphabetically Sort</option>
                    <option value="ascendente">Sort:  A - Z</option>
                    <option value="descendente">Sort:  Z - A</option>
                </select>
                <select>
                    <option>Games</option>
                    <option value="existentes">All</option>
                    <option value="creados">Created</option>
                </select>
                <select>
                    <option>Rating</option>
                    <option value="hight">Hight Rating</option>
                    <option value="low">Low Rating</option>
                </select>
                
                <GenreSelectOption allGenres={allGenres}/>
                
                
                {
                  currentVideoGames?.map( (e) => {
                        return(
                            <div key={e.id}>
                                <Link to={"/home/" + e.id}>
                                    
                                    <Card  
                                        name={e.name} 
                                        image={e.image} 
                                        genres={e.genres}
                                    />
                                </Link>
                            </div>
                        )
                    })
                    
                }

       

            </div>
        </div>
    )
}