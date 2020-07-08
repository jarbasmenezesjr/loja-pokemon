import React, {Component} from "react";
import Pokemon from "./Pokemon";
import {getPokemons, getPokemonInfo} from "./PokeAPI";
 
class Home extends Component{

   render(){   

      let data = getPokemons(0,9);
      let pokemons = localStorage.getItem('pokemons');    

      let listPokemons = JSON.parse(pokemons);

      listPokemons.map((p) => {
         data = getPokemonInfo(p.name); 
      });

      return(
         <Pokemon pokemons={pokemons}>
         </Pokemon>
      )
   }
}

export default Home;

