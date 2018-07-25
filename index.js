let axios = require('axios');
let app = require('express')();

let port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res)=>{
    res.send('Hola desde pokeapi');
});

app.get('/pokemons', (req, res)=>{
    // axios.get().the().catch;

    let pokeIds = [1,2,3];

    console.log('entre a peticion');
    

    let promesasIncompletas = pokeIds.map((id)=>{

        return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response)=>{
            let data = response.data;
            let name = data.name;
            let img = data.sprites.front_default;
            let pokemon = { name, img }
            console.log('entre al map');
            
            return pokemon;
        })
        .catch((error)=>{
            res.send(error);
        });
    });

    //Las promesas incompletas son el "map" de promesas. Dentro de cada promesa viene un objeto de pokemon (nombre e imagen). El Promise.all se ejecutará hasta que se resuelvan todos los elementos.
    Promise.all(promesasIncompletas).then((pokemones)=>{
        console.log('acabe todo');
        
        res.send(pokemones);
    });

});

app.listen(port, ()=>{
    console.log(`Todo bien, eres el mejor =*`, `Me levanté en el puerto ${port}`);
    
})