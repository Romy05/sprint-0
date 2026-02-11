import { fetchPokemonData } from "../api/pokemonController.js"
import { getRandomNumber } from "../helper/number.js"

export async function getRandomPokemon(amount = 1) {
    try {
        let pokemonArray = [];

        for(let i = 0; i < amount; i++) {
            const id = getRandomNumber(1025);
            const data = await fetchPokemonData(id);

            // Inspiratie uit ChatGPT omdat other.official-artwork.front_default niet werkte..
            const imageUrl = data.sprites.other['official-artwork'].front_default ?? data.sprites.front_default;

            pokemonArray = [
                ...pokemonArray,
                {
                    imageUrl,
                    name: data.species.name
                },
            ]
        }

        return pokemonArray  
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}