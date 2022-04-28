
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
            const allVideoGames = state.backUpGames;
            const genreFiltered = action.payload === "All" || action.payload === "Genres" ? allVideoGames : allVideoGames.filter(e => e.genres?.includes(action.payload))
            return{
                ...state,
                videogames: genreFiltered,
                
            }

        case "FILTER_BY_CREATED":
            const allVideoGames2 = state.backUpGames;
            const createdFilter = action.payload === "Created" ? allVideoGames2.filter(e => e.createInDb) : allVideoGames2.filter( e => !e.createInDb)
            console.log(allVideoGames2)
            console.log(createdFilter)
            return{
                ...state,
                videogames: action.payload === "All" || action.payload === "Games" ? state.backUpGames : createdFilter
            }

        case  "ORDER_BY_NAME":
            let sortGame = action.payload === "des"
            ? state.videogames.sort(function(a,b){
                
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0;

            }): state.videogames.sort(function(a,b){

                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortGame
            }
        
        case "ORDER_BY_RATING":
            // const allVideoGames3 = state.backUpGames;
            // const allRatingSort = allVideoGames3
            let sortByRating = action.payload === "Low"
            ? state.videogames.sort(function(a,b){
                
                if(a.rating > b.rating){
                    return -1;
                }
                if(a.rating < b.rating){
                    return 1;
                }
                return 0;

            }): state.videogames.sort(function(a,b){

                if(a.rating > b.rating){
                    return 1;
                }
                if(a.rating < b.rating){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortByRating
                
            }
        
        case "GET_VIDEOGAME_BY_NAME":
            return{
                ...state,
                videogames: action.payload
            }
        
        case "POST_VIDEOGAME":
            return{
                ...state
            }

        default:
            return state;
    }
    
}

export default rootReducer