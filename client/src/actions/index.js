import axios from "axios"


export function getVideoGame(){
    return async function(dispatch){
        var json = await axios.get("/videogames")
        
        return dispatch({
            type: "GET_GAME",
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("/genres")
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

export function orderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload: payload
    }
}

export function getNameVideoGame(payload){
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogames?name=${payload}`)
            return dispatch({
                type: "GET_VIDEOGAME_BY_NAME",
                payload: json.data,
                
            })
        } catch(error){
            console.log("getNameVideoGame"+ error)
        }
    }
}

export function postVideoGame(payload){
    return async function(dispatch){
        const response = await axios.post(`/videogame`,payload)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogame/${id}`)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function clearDatail(){
    return{
        type:"RESET_DETAIL"
    }
}

export function ratingLow(payload){
    return{
        type: "LOW_RATING",
        payload: payload
    }
}