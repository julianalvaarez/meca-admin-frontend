import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography, Alert } from 'antd';
import { EditSocioModal } from '../components/EditSocioModal';
import { MecaContext } from '../context/MecaContext';
import { Alerts } from '../components/Alerts';


const items = [{ key: '1', label: 'Editar' }, { key: '2', label: 'Eliminar' }];



export const SocioPage = ({ socio }) => {
    const navigate = useNavigate();
    const { getSocios, setDeleteAlert } = useContext(MecaContext)
    const { actividades } = socio
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({ ...socio });
    const [newActivities, setNewActivities] = useState([])
    const [newCategoryPadel, setNewCategoryPadel] = useState('')
    const showModal = () => {
        setFormState({ ...socio }); // Actualiza el estado con los datos del socio actual
        setNewActivities([...socio.actividades]);
        setNewCategoryPadel(socio.categoria_padel);
        setIsModalOpen(true);
    };



    const selectDropdownOption = async ({ key }) => {
        if (key === '1') {
            showModal()
        } else {
            const result = window.confirm('¿Desea eliminar el socio?')
            if (result) {
                try {
                    await axios.delete(`https://meca-admin-backend.onrender.com/eliminar-socio/${socio.dni}`)
                    getSocios()
                    navigate('/')
                    setDeleteAlert(true)
                    setTimeout(() => {
                        setDeleteAlert(false)
                    }, 2000)
                } catch (error) {
                    alert(error);
                }
            }
        }
    }

    function getFormattedDate(oldDate) {
        const date = new Date(oldDate)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }


    return (
        <section style={{ backgroundColor: '#001529', width: '100%' }} >
            <EditSocioModal formState={formState} setFormState={setFormState} socio={socio} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newActivities={newActivities} setNewActivities={setNewActivities} newCategoryPadel={newCategoryPadel} setNewCategoryPadel={setNewCategoryPadel} />
            <div className="w-full">
                <div style={{ width: '40%', margin: 'auto', marginTop: '10%' }} >
                    <div className='flex gap-4 items-center'>
                        <h2 className="text-white text-3xl font-bold">{socio.nombre} <span className="text-sm text-gray-300 font-normal">(DNI: {socio.dni})</span></h2>
                        <Dropdown
                            className='mt-2'
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['3'],
                                onClick: selectDropdownOption
                            }}
                        >
                            <Typography.Link>
                                <Space >
                                    <EllipsisOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </div>

                    <hr className="mt-2 mb-2 border-gray-600" />
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div className="text-white flex flex-col gap-3">

                            <p className='text-gray-300 mt-3 text-sm'><span className='font-bold text-lg mr-1 text-white'>Fecha de Nacimiento:</span> {socio.fecha_nacimiento}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Mail:</span> {socio.mail}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Telefono:</span> {socio.telefono}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Categoria de Padel:</span> {socio.categoria_padel ? socio.categoria_padel : 'Sin categoria'}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Fecha de Registro:</span> {getFormattedDate(socio.fecha_registro)}</p>
                            <hr className='border-gray-600' />
                        </div>
                        <div className='flex flex-col gap-3 mt-3'>
                            <p className="text-white font-bold text-lg ">Actividades:</p>
                            <ul className='flex flex-col gap-6 font-semibold'>
                                {actividades.map((actividad, index) => <li className="text-white flex justify-end border-r pr-3" key={index}><Link to={`/actividades`}>{actividad}</Link></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Alerts />
        </section>
    )
}
