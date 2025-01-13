import { Space, Table, ConfigProvider } from 'antd';
import { useContext, useEffect } from 'react';
import { MecaContext } from '../context/MecaContext';
import { useState } from 'react';


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Cumpleaños',
        dataIndex: 'fecha_nacimiento',
        key: 'fecha_nacimiento',
    },
];

export const MainContent = () => {
    const { cumpleaños } = useContext(MecaContext)
    const [info, setInfo] = useState([])

    useEffect(() => {
        setInfo(cumpleaños)
    }, [cumpleaños])


    const socios = info.map((socio) => {
        const date = new Date(socio.fecha_nacimiento)

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        // Retornar un nuevo objeto con la fecha formateada
        return { ...socio, fecha_nacimiento: formattedDate };
    })

    const data = socios.map((socio, index) => ({ key: index, nombre: socio.nombre, fecha_nacimiento: socio.fecha_nacimiento }))
    return (
        <ConfigProvider theme={{ token: { colorBgContainer: '#001529', colorText: '#fff', } }}>
            <div className='w-1/3 mx-auto mt-4 border border-solid rounded-lg border-gray-400 p-4'>
                <h4 className='text-white text-xl font-semibold text-center mb-4'>CUMPLEAÑOS MES ACTUAL</h4>
                <div className='w-full max-h-full overflow-auto'>
                    {info.length === 0 ? <p className='text-white text-lg font-semibold text-center'>No hay cumpleaños este mes</p> : <Table columns={columns} dataSource={data} pagination={false} />}
                </div>
            </div>

        </ConfigProvider>
    )
}
