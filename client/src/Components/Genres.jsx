import React from "react";
// import { getGenres } from "../actions"
// import {useDispatch, useSelector} from "react-redux"
// import { useEffect } from "react"

export default function GenreSelectOption({allGenres}){
    
return(
    <select>
        <option>Genres</option>
        {
            allGenres?.map(e =>{
                return(
                    <option key={e.id}>
                    
                        {
                            e.name
                        }
                    </option>
                )
            })
        }
    </select>
)

}

