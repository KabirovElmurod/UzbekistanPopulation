const country = 'http://localhost:3001/country'
const unit = 'http://localhost:3001/unit'
const data = 'http://localhost:3001/data'
export const getPopulation = async () => {
    const response = await fetch(data)
    return await response.json()
}

// export const getPeople = async () => {
//     const response = await fetch(data)

//     return await response.json()
// }