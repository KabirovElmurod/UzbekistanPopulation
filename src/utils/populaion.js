import { getPopulation } from '../api/api'


export const calculatePopulation = async () => {
    const response = await getPopulation()
    // console.log('res=>', response);

    let sumPeople = response.find(
        item => item.year == 2025
    ).population
    // sumPeople = sumPeople.toFixed(2)


    let people_1991 = response.find(
        item => item.year == 1991
    ).population

    let total = sumPeople - people_1991

    let grow = (total / people_1991) * 100

    grow = grow.toFixed(2)

    console.log(sumPeople, people_1991, total, grow);


    return [
        {
            'header': '2025 yil aholisi',
            'value': `${(sumPeople / 1000000).toFixed(2)
                }` + ' mln'
        },
        {
            'header': '1991 yil aholisi',
            'value': `${(people_1991 / 1000000).toFixed(2)
                }` + ' mln'
        },
        {
            'header': "O'sish",
            'value': `${(total / 1000000).toFixed(2)
                }` + ' mln'
        },
        {
            'header': "O'sish foizi",
            'value': grow
        }
    ]

}