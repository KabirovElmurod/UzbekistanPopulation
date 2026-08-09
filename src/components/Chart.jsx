import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { useEffect, useState } from 'react'
import { getPopulation } from '../api/api'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)



const handleLabel = async (min, max, e) => {
    // let btns = document.querySelectorAll('.btn_range')
    // btns.forEach(btn => {
    //     btn.classList.remove('active')
    // })
    // if (e) {
    //     e.target.classList.add('active')
    // }
    const res = await getPopulation()
    let labels = []
    let data = []
    for (let i = min - 1991; i <= max - 1991; i++) {
        labels.push(res[i].year)
        data.push(res[i].population)
    }
    return {
        labels,
        data
    }
}



export default function PopulationChart() {
    const [min, setMin] = useState(1991)
    const [max, setMax] = useState(2025)
    const [label, setLabel] = useState([])
    const [year, setYear] = useState([])

    const [startYear, setStartYear] = useState(1991)
    const [endYear, setEndYear] = useState(2025)
    const [select, setSelect] = useState([])
    const [message, setMessage] = useState('')



    useEffect(() => {
        let selects = []
        for (let i = startYear; i <= endYear; i++) {
            selects.push(i)
        }
        setSelect(selects)
    }, [])

    const handleBtnRange = async (e, min, max) => {
        let btns = document.querySelectorAll('.btn_range')
        btns.forEach(btn => {
            btn.classList.remove('active')
        })
        if (!e) return
        setMessage('')
        e.target.classList.add('active')
        let data = await handleLabel(min, max)
        setLabel(data.labels)
        setYear(data.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            let data = await handleLabel(min, max)
            setLabel(data.labels)
            setYear(data.data)
        }
        handleBtnRange()
        if (min > max) {
            setMessage('Xatolik')
            return
        }
        fetchData()
    }, [min, max])


    const data = {
        labels: label,

        datasets: [
            {
                label: 'Aholi soni',
                data: year,
                borderColor: 'green',
                backgroundColor: 'white',

            }
        ]
    }
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Yillar'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Aholi soni'
                }
            }
        }
    }

    return (
        <div className="population-chart">
            <div className="head">
                <h3>
                    O'sish grafiki
                </h3>
                <p>{message} </p>
                <div className="inputs">
                    <div>
                        <button className='btn_range' onClick={(e) => handleBtnRange(e, 1991, 2025)}>
                            1991-2025
                        </button>
                        <button className='btn_range' onClick={(e) => handleBtnRange(e, 2000, 2025)}>
                            2000-2025
                        </button>
                        <button className='btn_range' onClick={(e) => handleBtnRange(e, 2010, 2025)}>
                            2010-2025
                        </button>
                    </div>
                    <div>
                        <select name="startYear" value={min} id="startYear" onChange={(e) => {
                            setMin(e.target.value)
                        }}>
                            {
                                select?.map((item, index) => {
                                    return (
                                        <option key={item + 's'} value={item}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <span>---</span>
                        <select name="endYear" value={max} id="endYear" onChange={(e) => {
                            setMax(e.target.value)
                        }}>
                            {
                                select?.map((item, index) => {
                                    return (
                                        <option key={item + 's'} value={item} >
                                            {item}
                                        </option>

                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <Line data={data} options={options} />
        </div >
    )
}