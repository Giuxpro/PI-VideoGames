import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postVideoGame, getGenres, getVideoGame, backUpGames} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";


export default function VideoGamesCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector(state => state.genres);
    const allGames = useSelector(state => state.videogames);
    
    

    const [input, setInput] = useState({
        
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        genres:[],
        platforms:[]
    });

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);
    useEffect(() => {
        dispatch(getVideoGame())
    }, [dispatch]);


    function handleChange(e){
        
        setInput({ 
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleSelectForGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postVideoGame(input))
        alert("VideoGame Created Successfully")
        setInput({
            name:"",
            image:"",
            description:"",
            released:"",
            rating:"",
            genres:[],
            platforms:[]
        })
        history.push("/home")
    }

    const setArr = [];
    const setArr2 = [];
    const setGames = allGames.map(e => e.platforms.map(e => setArr.push(e)))
    let newSet = new Set(setArr)
    
  
               
    

    return(
        <div>
            <Link to="/home"><button>Return</button></Link>
            <h1>Create VideoGame</h1>

            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <div>
                        <label htmlFor="name">Nombre: </label>
                        <input 
                            type="text" 
                            value={input.name}
                            name="name"
                            onChange={e =>handleChange(e)}
                        />
                    </div>
                    {/* --------------------------------------- */}
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input 
                            type="text" 
                            value={input.description}
                            name="description"
                            onChange={e =>handleChange(e)}
                        />  
                    </div>
                    {/* --------------------------------------- */}
                    <div>
                        <label htmlFor="released">Released: </label>
                        <input 
                            type="text" 
                            value={input.released}
                            name="released"
                            onChange={e =>handleChange(e)}
                        />
                    </div>
                    {/* ---------------------------------------- */}
                    <div>
                        <label htmlFor="rating">Rating: </label>
                            <input 
                                type="text" 
                                value={input.rating}
                                name="rating"
                                onChange={e =>handleChange(e)}
                            />
                        </div>
                    {/* --------------------------------------- */}
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input 
                            type="text" 
                            value={input.image}
                            name="image"
                            onChange={e =>handleChange(e)}
                        />
                    </div>
                    {/* --------------------------------------- */}
                    <div>
                        <select onChange={e =>handleSelectForGenres(e)}>
                            <option>Genres</option>
                            {   allGenres.map( e =>(
                                     <option key={e.id} value={e.name}>{e.name}</option>
                                ))  
                            } 
                        </select> 
                        {/* REPARAR ESTE UL PARA Q NO TRAIGA REPETIDAS */}
                        <ul><li>{input.genres.map(e => e + " | ")}</li></ul>
                    </div>
                    {/* --------------------------------------- */}
                    {/* REPARAR ESTE INPUT DE ABAJO NO FUNCIONA!! */}
                    <div>
                        <select >
                            <option>Platforms</option>
                            { (

                                <option value={newSet}>{}</option>
                            )
                            

                            }
                            
                        </select> 
                    </div>
                    {/* --------------------------------------- */}
                    
                    <button type="submit" >Create VideoGame</button>
                    
                </div>
            </form>
        </div>
    )
}