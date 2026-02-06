import { fetchRomyData } from "../api/romyController.js"
import { getAge } from "../helper/age.js"

export async function getRomyData() {
    try {
        const { data } = await fetchRomyData();

        const custom = data.custom ? JSON.parse(data.custom) : {};
        const birthDate = new Date(data.birthdate);
        const age = getAge(birthDate);

        return {
            name: data.name ?? '',
            nickName: data.nickname ?? '',
            userName: data.github_handle ?? '',
            emoji: data.fav_emoji ?? '',
            birthDate,
            age,
            city: custom.city,
            birthCity: custom.city_of_birth,
            boardGames: custom.fav_board_games,
            pokemon: custom.fav_pokemon
        }
        
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}