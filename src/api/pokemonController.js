export async function fetchPokemonData(id) {
    try {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json());

    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}

