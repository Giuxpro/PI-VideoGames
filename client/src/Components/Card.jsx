import React from "react";

export default function Card({ name, image, genres}){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src={image} alt="File Not Found" width="300px" height="200px" />
        </div>
    )
}