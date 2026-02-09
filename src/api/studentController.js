export async function fetchRomyData() {
    try {
        const response = await fetch('https://fdnd.directus.app/items/person/318')
        
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }

        const result = await response.json();
        return result;
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}

export async function fetchCourseStudents() {
     try {
        const response = await fetch('https://fdnd.directus.app/items/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526')
        
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }

        const result = await response.json();
        return result;
    } catch(error) {
        console.error('something went wrong while fetching data', error)
    }
}