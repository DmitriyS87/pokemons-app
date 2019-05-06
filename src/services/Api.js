import Pocedex from 'pokedex-promise-v2';

const P = new Pocedex();

class Api {
    constructor() {
       this.P = P;
    }

    getTypes() {
        return this.P.getTypesList()
        .catch((e) => {
           console.log(e);
        }); 
    }

    getTypePokemons(url) {
        return this.P.resource(url)
        .catch((e) => {
           console.log(e);
        }); 
    }

    
    getPokemonsList() {
        return this.P.getPokemonsList()
        .catch((e) => {
           console.log(e);
        }); 
    }

    getPokemons() {
        return this.P.resource('/api/v2/pokemon/')
        .catch((e) => {
           console.log(e);
        }); 
    }

    getPokemonData(url) {
        if (url) {
            return this.P.resource(url)
        }
        return new Error(`url is not valid`);
    }
}

export default new Api();