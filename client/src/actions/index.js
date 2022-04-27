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

export function filterVideoGameByGenres(payload){
    
    return{
        type:"FILTER_BY_GENRE",
        payload: payload,
        //res:console.log(payload)
    }
}

export function filterByCreated(payload){
    return{
        type: "FILTER_BY_CREATED",
        payload: payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload: payload
    }
}