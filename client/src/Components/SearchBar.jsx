import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";
import styles from "./SearchBar.module.css"


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("")



    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(e.target.value)
      
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideoGame(name))
        setName("")
    
    }

    return(
        <div>
            <input 
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            onChange={e=> handleInputChange(e)}
            />
            
            <button className={styles.searchBtn} type="submit" onClick={e=> handleSubmit(e)}>Search</button>
        </div>
    )
}