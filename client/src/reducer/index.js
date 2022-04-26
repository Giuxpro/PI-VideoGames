
const initialState = {
    videogames:[],
    backUpGames:[],
    genres:[],

}

function rootReducer (state= initialState, action){
    switch(action.type){
        case "GET_GAME":
            return{
                ...state,
                videogames: action.payload,
                backUpGames: action.payload
            }
        case "GET_GENRE":
            return{
                ...state,
                genres: action.payload
            }
        case "FILTER_BY_GENRE":
            const allVideoGames = state.videogames;
            const genreFiltered = action.payload === "All" ? allVideoGames : allVideoGames.filter(e => e.genres)
            return{
                
            }
    
        default:
            return state;
    }
    
}

export default rootReducer