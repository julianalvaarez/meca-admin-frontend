import { useContext } from "react";
import { Link } from "react-router";
import { MecaContext } from "../context/MecaContext";

export const ActividadesPage = () => {
    const { futbol, padel, boxeo, gym } = useContext(MecaContext)

    return (
        <section style={{ backgroundColor: '#001529', width: '100%' }}>
            <div className="text-white text-center m-10">
                <div className="flex"><Link to={'/'} className="text-sm align-center font-semibold underline hover:text-blue-200">Atras</Link><h1 className="text-3xl font-bold mb-16 flex-1">ACTIVIDADES</h1></div>
                <div className="grid grid-cols-4 border border-gray-600 p-4 rounded">
                    <div className="border-r border-gray-600">
                        <span className="font-semibold text-lg border-b pb-1">ACADEMIA FUTBOL <span>({futbol.length})</span></span>
                        <ul className="mt-5 flex flex-col gap-2">
                            {futbol.length === 0 ? <li className="font-semibold text-lg">No hay inscriptos</li> : futbol.map((act) => <li key={act.dni} className="font-light text-lg"><Link to={`/socio/${act.dni}`}>{act.nombre}</Link></li>)}
                        </ul>
                    </div>
                    <div className="border-r border-gray-600">
                        <span className="font-semibold text-lg border-b pb-1">ACADEMIA PADEL <span>({padel.length})</span></span>
                        <ul className="mt-5 flex flex-col gap-2">
                            {padel.length === 0 ? <li className="font-semibold text-lg">No hay inscriptos</li> : padel.map((act) => <li key={act.dni} className="font-light text-lg"><Link to={`/socio/${act.dni}`}>{act.nombre}</Link></li>)}
                        </ul>
                    </div>
                    <div className="border-r border-gray-600">
                        <span className="font-semibold text-lg border-b pb-1">BOXEO <span>({boxeo.length})</span></span>
                        <ul className="mt-5 flex flex-col gap-2">
                            {boxeo.length === 0 ? <li className="font-semibold text-lg">No hay inscriptos</li> : boxeo.map((act) => <li key={act.dni} className="font-light text-lg"><Link to={`/socio/${act.dni}`}>{act.nombre}</Link></li>)}
                        </ul>
                    </div>
                    <div className="border-r border-gray-600">
                        <span className="font-semibold text-lg border-b pb-1">GIMNASIO <span>({gym.length})</span></span>
                        <ul className="mt-5 flex flex-col gap-2">
                            {gym.length === 0 ? <li className="font-semibold text-lg">No hay inscriptos</li> : gym.map((act) => <li key={act.dni} className="font-light text-lg"><Link to={`/socio/${act.dni}`}>{act.nombre}</Link></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
