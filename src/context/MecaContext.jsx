import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const MecaContext = createContext()
export const MecaContextProvider = ({ children }) => {
    const [socios, setSocios] = useState([])
    const [cumpleaños, setCumpleaños] = useState([])
    const mes = new Date().getMonth() + 1
    const [gym, setGym] = useState([])
    const [boxeo, setBoxeo] = useState([])
    const [futbol, setFutbol] = useState([])
    const [padel, setPadel] = useState([])
    async function getActivities() {
        try {
            const { data } = await axios.get('http://localhost:3000/actividades')
            data.gimnasio && setGym(data.gimnasio)
            data.academia_futbol && setFutbol(data.academia_futbol)
            data.boxeo && setBoxeo(data.boxeo)
            data.academia_padel && setPadel(data.academia_padel)
        } catch (error) {
            alert(error)

        }
    }

    const getSocios = async () => {
        const { data, status } = await axios.get('http://localhost:3000/socios')
        if (status !== 200) {
            alert('Error al obtener los socios')
            return
        }
        setSocios(data)
    }

    const getBirthdays = async () => {
        const { data, status } = await axios.get(`http://localhost:3000/socios-por-mes/${mes}`)
        if (status !== 200) {
            alert('Error al obtener los socios')
            return
        }
        setCumpleaños(data)
    }

    useEffect(() => {
        getSocios()
        getBirthdays()
        getActivities()
    }, [])

    return (
        <MecaContext.Provider value={{ socios, getSocios, cumpleaños, getBirthdays, gym, futbol, boxeo, padel, getActivities }}>
            {children}
        </MecaContext.Provider>
    )
}
