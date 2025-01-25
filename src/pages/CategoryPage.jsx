import { useContext } from "react"
import { MecaContext } from "../context/MecaContext"
import { Link } from "react-router";
export const CategoryPage = () => {
    const { socios } = useContext(MecaContext)

    const categorias = socios.reduce((acc, socio) => {
        acc[socio.categoria_padel] = [socio, ...(acc[socio.categoria_padel] || [])];
        return acc;
    }, {});

    console.log(categorias);
    return (
        <section style={{ backgroundColor: '#001529', maxWidth: '100%', width: '100%' }}>
            <div className="text-center m-10 text-white">
                <div className="flex">
                    <Link
                        to={"/"}
                        className="text-sm align-center justify-items-center font-semibold underline hover:text-blue-200"
                    >
                        Atrás
                    </Link>
                    <h1 className="text-3xl font-bold flex-1">CATEGORIAS</h1>
                </div>
                <p className="text-xs mb-16 text-gray-400 mt-1">(Se muestran solo las categorias donde hay socios anotados)</p>
                <div className="grid grid-cols-8  border border-gray-600 p-4 rounded gap-4">
                    {Object.entries(categorias).filter(([categoria]) => categoria !== "null").map(([categoria, socios]) => (
                        <div key={categoria} className="border-r border-gray-600 p-2">
                            <span className="font-semibold text-lg border-b pb-1">{categoria.toUpperCase()}</span>
                            <ul className="mt-5 flex flex-col gap-2">
                                {socios.map(socio => (
                                    <li key={socio.dni} className="font-light text-lg"><Link to={`/socio/${socio.dni}`}>{socio.nombre}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
