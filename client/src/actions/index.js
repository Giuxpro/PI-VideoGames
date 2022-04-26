import axios from "axios"


export function getVideoGame(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames")
        
        return dispatch({
            type: "GET_GAME",
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRE",
            payload: json.data
        })
    }
}