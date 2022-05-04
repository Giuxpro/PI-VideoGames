import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styles from "./VideogameDetails.module.css"


export default function VideoGameDetail(){
    

    const dispatch = useDispatch();
    let {id}= useParams()
  
    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])

    const videoGameDetail = useSelector((state)=> state.detail)
    console.log(videoGameDetail)

    return(

        <div>
            {   
                
                videoGameDetail.name?
                
                <div className={styles.detailContainer} key={videoGameDetail.id}>
                    <img className={styles.gameImg}src={videoGameDetail.image} alt="File Not Found" width="300px" hight="300px"/>
                    <div className={styles.gameDetail}>
                        <h1>{videoGameDetail.name}</h1>
                        <p><strong>Released: </strong>{videoGameDetail.released}</p>
                        <p className={styles.pRatingDetail}><strong>Rating: </strong><p className={styles.ratingDetails}>{videoGameDetail.rating}</p></p>
                        <p><strong>Platfom: </strong>{videoGameDetail.platforms?.map(e => <div>{e + " "}</div>)}</p>
                        <p><strong>Genre: </strong>{videoGameDetail.genres?.map(e => e ).join(", ")}</p>
                        <p><strong>Sinopsis: </strong>{<p dangerouslySetInnerHTML={{__html: videoGameDetail.description}}></p>}</p>
                    </div>
             
                </div>
                  : <p className={styles.loadingDetail}>Loading...</p>
            }   

            <Link to="/home">
                <button className={styles.backBtnDetail}>Back</button>
            </Link>

            </div>
    )
}