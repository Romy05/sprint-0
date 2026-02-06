import { fetchPokemonData } from "../api/pokemonController.js"
import { getRandomNumber } from "../helper/number.js"

export async function getPokemonData() {
    try {
        const id = getRandomNumber(1025);
        const data = await fetchPokemonData(id);

        // Inspiratie uit ChatGPT omdat other.official-artwork.front_default niet werkte..
        const imageUrl = data.sprites.other['official-artwork'].front_default ?? data.sprites.front_default;

        return {
            imageUrl,
            name: data.species.name
        }
        
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}