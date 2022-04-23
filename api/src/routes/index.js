const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Videogame, Genre } = require("../db")
const {API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
try{
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    // const apiInfo1 = await axios.get(apiUrl.data.info.next)
    const apiInfo = await apiUrl.data.results.map( (e) => {

        const objInfo ={

            id: e.id,
            img: e.background_image,
            name: e.name,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e => e.platform.name),
            genre: e.genres.map( e => e.name),
            description: e.description,
            // requirements:e.requirements_en? Object.keys(e.requirements_en): "Requirement Not Found",
        }

        return objInfo;
    })
    //console.log(apiInfo)
    return apiInfo;
}catch(error){
    console.log(error);
    
}
}

const getDbInfo = async ()=> {
    return await Videogame.findAll({
        includes: {
            model: Genre,
            attributes:["name"],
            through: {
                attributes: [],
            },
        },
    });
};

const allGamesInfo = async () =>{
    const allApiInfo = await getApiInfo();
    const allDbInfo = await getDbInfo();
    const totalInfo = allApiInfo.concat(allDbInfo)
    return totalInfo
}


router.get("/videogames", async (req, res) => {
    const {name} = req.query;
    const videoGamesInfo = await allGamesInfo();

    if(name){
       let videoGameName = await videoGamesInfo.filter( e => e.name.toLowerCase().includes(name.toLowerCase()));
       let gameArr=[];
       let aux = 15;
       for(let i = 0; i < aux; i++){
           if(videoGameName[i]){
            gameArr.push(videoGameName[i])
           }
       }
       gameArr.length?
       res.status(200).send(gameArr):
       res.status(404).send("VideoGame By Name Not Found")
    }
    else{

        res.status(200).json(videoGamesInfo)
    }
    
})

router.get("/videogame/:id", async (req,res) =>{
    const {id} = req.params;
    const videoGameInfoId = await allGamesInfo();

    if(id){
    let videoGameId = await videoGameInfoId.filter( e => e.id == id);
    videoGameId.length > 0?
    res.status(200).json(videoGameId):
    res.status(404).send("VideoGame By Id Not Found")
    }
})

router.get("/genres", async (req,res) =>{
    const genreApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    let genreArr = [];
    const infoApi = await genreApi.data.results.map(e => e.genres.map(e => {
        if(e.name){
            genreArr.push(e.name)
        }
    })
    );

    console.log(genreArr)
    genreArr.forEach(e => {
        
            Genre.findOrCreate({
                where:{ name: e},
            });
        
    });

    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);

    

})

module.exports = router;
