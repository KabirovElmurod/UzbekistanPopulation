import React, { useEffect, useState } from 'react'
import { calculatePopulation } from '../utils/populaion'

export default function Population() {
    const [population, setPopulation] = useState([])

    const getPopulation = async () => {
        let res = await calculatePopulation()
        setPopulation(res)
    }
    useEffect(() => {
        getPopulation()
    }, [])
    return (
        <div className="population">
            {
                population?.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3>
                                {item.header}
                            </h3>
                            <p>
                                {item.value}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}
