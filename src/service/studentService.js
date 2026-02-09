import { fetchRomyData, fetchCourseStudents } from "../api/studentController.js"
import { getAge } from "../helper/age.js"

export async function getRomyData() {
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
}

export async function getValidCourseStudents() {
    const { data } = await fetchCourseStudents();

    const peopleArray = data
        .filter(person => person.name && person.avatar)
        .map(person => {
                return {
                    name: person.name,
                    nickName: person.nickname,
                    emoji: person.fav_emoji,
                    avatarUrl: person.avatar,
                }
            }   
        )
    return peopleArray;
}