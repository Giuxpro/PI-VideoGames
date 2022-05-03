import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postVideoGame, getGenres, getVideoGame} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";




function Validate(input){
    let errors = {};
    
    let regexName = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;   
    let regexDescription = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;// regex initial Space: null, Mayus, min, space betw: true
    let regexReleased = /[012345]{1,8}/;
    let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
    

    if(!regexName.test(input.name)){
        errors.name = "Name required";
    }
    else if(!regexDescription.test(input.description)){
        errors.description = "Descripcion required"
    }
    else if(!regexReleased.test(input.released)){
        errors.released = "Released date required"
    }
    else if(!regexRating.test(input.rating)){
    errors.rating = "Rating required (1-5)"
    }
    


    return errors;
}




export default function VideoGamesCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector(state => state.genres);
    const allGames = useSelector(state => state.videogames);
    
    
    const [errorValidated, setErrorValidated] = useState({})
    const [errorButton, setErrorButton] = useState(errorValidated.length < 1? false : true);
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
       setErrorValidated(Validate(input))
       console.log(input)
    }

    function handleSelectForGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
            
        })
        
    }

    function handleGenresDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== e)
        })
    }

    function handleSelectForPlatform(e){
        setInput({
            ...input,
            platforms: [input.platforms, e.target.value]
        })
    }

    function handlePlatformDelete(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setErrorValidated(Validate(input))
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
   
     allGames.map(e => e.platforms?.map(e => setArr.push(e)))
    let newSet = [...new Set(setArr)]
    
    

    return(
        <div>
            
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
                        {errorValidated.name? <h4>{errorValidated.name}</h4>: false}
                    </div>
                    {/* --------------------------------------- */}
                    <div>
                        <label htmlFor="description">Description: </label>
                        <textarea 
                            type="text" 
                            value={input.description}
                            name="description"
                            onChange={e =>handleChange(e)}
                        />
                        {errorValidated.description? <h4>{errorValidated.description}</h4>: false} 
                    </div>
                    {/* --------------------------------------- */}
                    <div>
                        <label htmlFor="released">Released: </label>
                        <input 
                            type="date" 
                            value={input.released}
                            name="released"
                            onChange={e =>handleChange(e)}
                        />
                        {errorValidated.released? <h4>{errorValidated.released}</h4>: false}
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
                            {errorValidated.rating? <h4>{errorValidated.rating}</h4>: false}
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
                            <option value="gen">Genres</option>
                            {   allGenres.map( e =>(
                                     <option key={e.id} value={e.name}>{e.name}</option>
                                ))  
                            } 
                        </select> 
                        
                        {/* <ul><li>{input.genres.map(e => e  + " | ")}</li></ul> */}
                        {input.genres.map(e =>
                            <div key={e}>
                                <p>{e}</p>
                                <button onClick={()=> handleGenresDelete(e)}>X</button>
                            </div>
                        )}
                    </div>
                    {/* --------------------------------------- */}
                    
                    <div>
                        <select onChange={e => handleSelectForPlatform(e)}>
                            <option value="plat">Platforms</option>
                            { newSet.map(e => (

                                <option key={e} value={e}>{e}</option>
                             ))
                                
                            }
                            
               
                        </select> 
                        {/* <ul><li>{input.platforms?.map(e => e  + " | ")}</li></ul> */}
                        {input.platforms.map(e =>
                            <div key={e}>
                                <p>{e}</p>
                                <button onClick={()=> handlePlatformDelete(e)}>X</button>
                            </div>
                        )}
                    </div>
                    {/* --------------------------------------- */}
                    
                    <Link to="/home"><button>Back</button></Link>
                    <button type="submit" disabled={false}>Create VideoGame</button>
                    
                </div>
            </form>

        </div>
    )
}