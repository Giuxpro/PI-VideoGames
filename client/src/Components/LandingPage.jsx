import React from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage (){
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingPag}>
                <h1 className={styles.landingTitle}>GiuxGames</h1>
                <Link to="/home">
                    <button className={styles.landingBtn}><span>Start</span></button>
                </Link> 
            </div>
        </div>
    )
}