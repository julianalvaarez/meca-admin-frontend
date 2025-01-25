import { useContext, useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import { MecaContext } from '../context/MecaContext';
import { Link } from 'react-router';


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Cumpleaños',
        dataIndex: 'fecha_nacimiento',
        key: 'fecha_nacimiento',
    },
];

export const MainContent = () => {
    const { cumpleaños } = useContext(MecaContext)
    const [socios, setSocios] = useState([])

    useEffect(() => {
        setSocios(cumpleaños)
    }, [cumpleaños])


    const data = socios.map((socio, index) => ({ key: index, nombre: socio.nombre, fecha_nacimiento: socio.fecha_nacimiento }))

    return (
        <ConfigProvider theme={{ token: { colorBgContainer: '#001529', colorText: '#fff', } }}>
            <div className='w-1/3 mx-auto mt-4 border border-solid rounded-lg border-gray-400 p-4'>
                <h4 className='text-white text-xl font-semibold text-center mb-4'>CUMPLEAÑOS MES ACTUAL</h4>
                <div className='w-full max-h-full overflow-auto'>
                    {socios.length === 0 ? <p className='text-white text-lg font-semibold text-center'>No hay cumpleaños este mes</p> : <Table columns={columns} dataSource={data} pagination={false} />}
                </div>
            </div>

        </ConfigProvider>
    )
}
