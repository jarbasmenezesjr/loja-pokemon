const URL = 'https://pokeapi.co/api/v2/'; 
 
 export async function getPokemonInfo(name){
   const response = await fetch(URL + `pokemon/${name}`);
   const data = await response.json();

   localStorage.setItem(name,JSON.stringify(data));

   return data;
}
 
 export async function getPokemons(offset,limit){
    const response = await fetch(URL + `pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    localStorage.setItem("pokemons",JSON.stringify(data.results));

    return data;
 }
