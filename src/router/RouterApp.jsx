import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from 'antd';
import { MecaContext } from '../context/MecaContext';
import { HomePage, SocioPage, ActividadesPage, RegisterPage } from '../pages';
import { Sidebar } from '../components/Sidebar';
import { CategoryPage } from '../pages/CategoryPage';


export const RouterApp = () => {
    const { socios: data } = useContext(MecaContext)
    const [socios, setSocios] = useState([])
    useEffect(() => {
        setSocios(data)
    }, [data])
    return (
        <Layout>
            <Sidebar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/actividades' element={<ActividadesPage />} />
                <Route path='/registrar-socio' element={<RegisterPage />} />
                <Route path='/categorias' element={<CategoryPage />} />
                {socios.map(socio => <Route key={socio.dni} path={`/socio/${socio.dni}`} element={<SocioPage socio={socio} />} />)}
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </Layout>
    )
}
