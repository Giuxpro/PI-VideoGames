import React from "react";
import img from "../Image/port5.jpg"
import styles from "../Components/Card.module.css"

export default function Card({ name, image, genres, rating}){
    return (
        <div className={styles.cardContainer}>
            <img className={styles.cardImg} src={image ? image : img} alt="File Not Found" width="300px" height="200px" />
            <h3 className={styles.cardName}>{name}</h3>
            <h5 className={styles.cardGenre}>{ genres + " "}</h5>
            <h3 className={styles.cardRating}>{rating}</h3>
           
        </div>
    )
}