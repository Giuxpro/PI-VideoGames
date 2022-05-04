import React from "react";
import img from "../Image/port5.jpg"
import styles from "../Components/Card.module.css"

export default function Card({ name, image, genres, rating}){
    return (
        <div className={styles.cardContainer}>
             <img className={styles.cardImg} src={image ? image : img} alt="File Not Found" width="250px" height="150px" />
          
            <div className={styles.textContainer}>
            
                <div className={styles.nameContainer}>
                    <h3 className={styles.cardName}>{name}</h3>
                </div>

                <div className={styles.genreContainer}>
                    <h5 className={styles.cardGenre}>{ genres + " "}</h5>
                </div>

                <div className={styles.raitingContainer}>
                    <h3 className={styles.cardRating}>{rating}</h3>
                </div>
            </div>
            

           
        </div>
    )
}