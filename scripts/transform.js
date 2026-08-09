
import fs from 'fs'

const respone = await fetch('https://api.worldbank.org/v2/country/UZB/indicator/SP.POP.TOTL?format=json&per_page=100')

const results = await respone.json()

let data = results[1]
    .filter((item) => item.value !== null)
    .filter((item) => Number(item.date) >= 1991)
    .map((item) => ({
        'year': item.date,
        'population': item.value
    }))
    .sort((a, b) => a.year - b.year)


const mockData = {
    'country': 'Uzbekistan',
    'unit': 'people',
    'data': data
}
fs.writeFileSync('mock/db.json', JSON.stringify(mockData), 'utf8')
console.log('done')