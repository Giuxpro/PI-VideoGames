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

// const getApiInfo = async () =>{
// try{
//     const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
//     // const apiInfo1 = await axios.get(apiUrl.data.info.next)
//     const apiInfo = await apiUrl.data.results.map( (e) => {

//         const objInfo ={

//             id: e.id,
//             img: e.background_image,
//             name: e.name,
//             released: e.released,
//             rating: e.rating,
//             platforms: e.platforms.map(e => e.platform.name),
//             genres: e.genres.map( e => e.name),
//             description: e.description,
//             // requirements:e.requirements_en? Object.keys(e.requirements_en): "Requirement Not Found",
//         }

//         return objInfo;
//     })
//     //console.log(apiInfo)
//     return apiInfo;
// }catch(error){
//     console.log(error);
    
// }
// }

const getApiInfo = async () => {
    let result = []; //uno por uno con su respectiva info
    let querries = []; //5 paginas de 20c/u = 100 arreglos de videojuegos
    let page = [1, 2, 3, 4, 5];
  
    page.forEach((e) => {
      querries.push(
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${e}`)
      );
    });
  
    await Promise.all(querries)
      .then((e) => { //100
        e.forEach((e) => {
          let res = e.data;
          result.push(
            ...res.results.map((e) => {
                const objInfo ={

                    id: e.id,
                    img: e.background_image,
                    name: e.name,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(e => e.platform.name),
                    genres: e.genres.map( e => e.name),
                    description: e.description,
                    // requirements:e.requirements_en? Object.keys(e.requirements_en): "Requirement Not Found",
                }
                    
                return objInfo;
            })
          );
        });
      })
      .then(() => result)
      .catch((error) => console.log(error));
    return result;
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
   
    const apiGenreInfo = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const { results } = apiGenreInfo.data;
      //Itero cada uno de los resultados para extraer las propiedades name, si existe no la creo y si no existe la creo
      for (let i = 0; i < results.length; i++) {
        const { name } = results[i];
        // console.log(results[i]);
        await Genre.findOrCreate({
          where: { name: name },
        });
      }
      let allGenres = await Genre.findAll();
      res.status(200).json(allGenres);

})

router.post("/videogame", async (req,res) =>{
    const { name, img, description, released, rating, genres, platforms } = req.body;
   try{ 
    const newVideogame = await Videogame.create({
        name,
        description,
        img,
        released,
        rating,
        platforms,

    })

    let findGenres = await Genre.findAll({
        
        where: {name: genres }
    
    });
    
     newVideogame.addGenre(findGenres);
   
    res.send("VideoGame Created Successfully")
    
    
}catch(error){
    console.log(error)
    console.log("Error en la ruta de Post")
}
})

module.exports = router;
