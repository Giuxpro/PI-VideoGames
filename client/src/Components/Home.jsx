import React from "react"
import { useState,useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import { getVideoGame, getGenres, filterVideoGameByGenres, filterByCreated, orderByName, orderByRating } from "../actions"
import Card from "./Card"
import Paginado from "./Paginado";
import GenreSelectOption from "./Genres"
import SearchBar from "./SearchBar";


export default function Home(){
    const dispatch = useDispatch()
    const allVideoGames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);
    const [orden, setOrden]= useState("")

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
        setCurrentPage(1)
    }
    function handleFilterGenres(e){
        
        dispatch(filterVideoGameByGenres(e.target.value))
        setCurrentPage(1)
    }
    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
         //setCurrentPage(1)
    }
    function handleSort(e){
        //e.preventDefault()
        dispatch(orderByName(e.target.value));
        setOrden(`Ordenado ${e.target.value}`)
        setCurrentPage(1)
    }
    function handleSortByRating(e){
        dispatch(orderByRating(e.target.value));
        setOrden(`Ordenado ${e.target.value}`)
        setCurrentPage(1)
    }
    


    return(
        <div>
            <Link to="/videogame">Crear VideoGame</Link>
            <h1>Giusepp Game</h1>
            <button onClick={(e)=>handleClick(e)}>
                Cargar VideoGame
            </button>
            <div>
                <SearchBar 
                
                />
            </div>
            <div>
                <Paginado
                    videoGamesPage={videoGamesPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                />
            </div>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="alpha">Alphabetically Sort</option>
                    <option value="asc">Sort:  A - Z</option>
                    <option value="des">Sort:  Z - A</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="Games">All Games</option>
                    <option value="api">Games Api</option>
                    <option value="Created">Created</option>
                </select>
                <select onChange={ e => handleSortByRating(e)}>
                    <option value="Rating">Rating</option>
                    <option value="Hight">Hight Rating</option>
                    <option value="Low">Low Rating</option>
                </select>
                <select onChange={e => handleFilterGenres(e)}>
                    <option value="Genres">All Genres</option>
                    <GenreSelectOption 
                        allGenres={allGenres}  
                    />
                </select>
                
                
                {
                  currentVideoGames?.map( (e) => {
                        return(
                            <div key={e.id}>
                                <Link to={"/home/" + e.id}>
                                    
                                    <Card  
                                        name={e.name} 
                                        image={e.image} 
                                        genres={e.genres}
                                        rating={e.rating}
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