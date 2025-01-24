import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const MecaContext = createContext()

export const MecaContextProvider = ({ children }) => {
    const [socios, setSocios] = useState([])

    // Alerts
    const [alert, setAlert] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [createAlert, setCreateAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)

    // Loading state
    const [dataIsLoading, setDataIsLoading] = useState(false)

    // Cumpleaños de este mes
    const [cumpleaños, setCumpleaños] = useState([])
    const mes = new Date().getMonth() + 1

    // Actividades
    const [gym, setGym] = useState([])
    const [boxeo, setBoxeo] = useState([])
    const [futbol, setFutbol] = useState([])
    const [padel, setPadel] = useState([])


    const getSocios = async () => {
        try {
            setDataIsLoading(true)
            const { data, status } = await axios.get('https://meca-admin-backend.onrender.com/socios')
            if (status !== 200) {
                alert('Error al obtener los socios')
                return
            }
            setSocios(data)
        } catch (error) {
            alert(error)
        } finally {
            setDataIsLoading(false)
        }
    }


    async function getActivities() {
        try {
            const { data } = await axios.get('https://meca-admin-backend.onrender.com/actividades')
            data.gimnasio && setGym(data.gimnasio)
            data.academia_futbol && setFutbol(data.academia_futbol)
            data.boxeo && setBoxeo(data.boxeo)
            data.academia_padel && setPadel(data.academia_padel)
        } catch (error) {
            alert(error)

        }
    }

    const getBirthdays = async () => {
        const { data, status } = await axios.get(`https://meca-admin-backend.onrender.com/socios-por-mes/${mes}`)
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
        <MecaContext.Provider value={{ socios, getSocios, cumpleaños, getBirthdays, gym, futbol, boxeo, padel, getActivities, alert, setAlert, errorAlert, setErrorAlert, deleteAlert, setDeleteAlert, createAlert, setCreateAlert, dataIsLoading, setDataIsLoading }}>
            {children}
        </MecaContext.Provider>
    )
}
