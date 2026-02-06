export async function fetchPokemonData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }

        const result = await response.json();
        return result;
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}