import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";


export default function VideoGameDetail(){
    

    const dispatch = useDispatch();
    let {id}= useParams()

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])

    const videoGameDetail = useSelector((state)=> state.detail)


    return(

        <div>
            {
                videoGameDetail.length > 0 ?
                <div key={id}>
                    <img src={videoGameDetail[0].image} alt="File Not Found" />
                    <h1>{videoGameDetail[0].name}</h1>
                    <h3>{videoGameDetail[0].released}</h3>
                    <h3>{videoGameDetail[0].rating}</h3>
                    <h3>{videoGameDetail[0].platforms.map(e => <div>{e + " "}</div>)}</h3>
                    <h3>{videoGameDetail[0].genres.map(e => <div>{e + " "}</div>)}</h3>
                </div>
                : <p>Loading...</p>
            }   

            <Link to="/home">
                <button>Back</button>
            </Link>

        </div>
    )
}