import React from "react";

export default function Card({ name, image, genres, rating}){
    return (
        <div>
            <img src={image} alt="File Not Found" width="300px" height="200px" />
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h3>{rating}</h3>
            {/* recuerda colocar una img por defaul  */}
        </div>
    )
}