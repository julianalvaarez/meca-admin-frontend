import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography, Modal, Input, Alert, Select } from 'antd';


const items = [{ key: '1', label: 'Editar' }, { key: '2', label: 'Eliminar' }];
const options = ['gimnasio', 'academia_futbol', 'boxeo', 'academia_padel'].map((item) => ({ value: item, label: item }));


export const SocioPage = ({ socio, getSocios }) => {
    const navigate = useNavigate();
    const { actividades } = socio;
    const formData = {
        nombre: socio.nombre,
        fecha_nacimiento: socio.fecha_nacimiento,
        mail: socio.mail,
        telefono: socio.telefono,
        cantidad_reservas: socio.cantidad_reservas
    }
    const [activities, setActivities] = useState([])
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [formState, setFormState] = useState(formData);
    const { nombre = '', fecha_nacimiento = '', mail = '', telefono = '', cantidad_reservas = '' } = formState;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChangeActivities = (value) => {
        setActivities([...value]);
        console.log(activities);
    };

    function handleInputFormChange({ target }) {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleCloseAlerts = () => {
        setVisible(false);
        setError(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
        console.log(socio);
    };

    const closeModal = async () => {
        setIsModalOpen(false);
        const activitiesToIdMap = {
            'gimnasio': 1,
            'academia_futbol': 2,
            'academia_padel': 3,
            'boxeo': 4,
        }

        const getIdActivities = (nombresActividades) => {
            return nombresActividades.map(nombre => activitiesToIdMap[nombre]).filter(id => id !== undefined);
        };
        const idActividades = getIdActivities(activities);
        console.log(idActividades);
        try {
            console.log(formState);
            await axios.put(`https://meca-admin-backend.onrender.com/actualizar-socio/${socio.dni}`, {
                ...formState,
                fecha_nacimiento: getFormattedDate(fecha_nacimiento),
                id_socio: socio.id_socio,
                idActividades
            });

            getSocios()
            setVisible(true);
        } catch (error) {
            setError(true);
            console.log(error);

        }
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };


    const onDeleteSocio = async ({ key }) => {
        if (key === '1') {
            console.log('Editar');
            showModal()
        } else {
            console.log('Eliminar');
            const result = window.confirm('¿Desea eliminar el socio?')
            if (result) {
                try {
                    const res = await axios.delete(`https://meca-admin-backend.onrender.com/eliminar-socio/${socio.dni}`)
                    getSocios()
                    navigate('/')
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
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    return (
        <section style={{ backgroundColor: '#001529', width: '100%' }} >
            {visible && (
                <Alert message="Socio Actualizado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
            {error && (
                <Alert message="El Socio no pudo ser actualizado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
            <Modal title="Editar Socio" open={isModalOpen} onOk={closeModal} onCancel={handleCancelModal} >
                <form >
                    <div className="flex flex-col gap-4">
                        <Input placeholder='Nombre' name='nombre' value={nombre} onChange={handleInputFormChange} defaultValue={socio.nombre} />
                        <Input placeholder='Email' name='mail' value={mail} onChange={handleInputFormChange} defaultValue={socio.mail} />
                        <Input placeholder='Telefono' name='telefono' value={telefono} onChange={handleInputFormChange} defaultValue={socio.telefono} />
                        <Input placeholder='Fecha de Nacimiento' name='fecha_nacimiento' value={getFormattedDate(fecha_nacimiento)} onChange={handleInputFormChange} defaultValue={socio.fecha_nacimiento} />
                        <Input placeholder='Cantidad de Reservas' name='cantidad_reservas' value={cantidad_reservas} onChange={handleInputFormChange} defaultValue={socio.cantidad_reservas} />
                        <Space
                            style={{
                                width: '100%',
                            }}
                            direction="vertical"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                    marginBottom: '20px',
                                }}
                                placeholder="Actividades"
                                onChange={handleChangeActivities}
                                options={options}
                                defaultValue={actividades}
                            />

                        </Space>
                    </div>
                </form>
            </Modal>
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
                                onClick: onDeleteSocio
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

                            <p className='text-gray-300 mt-3 text-sm'><span className='font-bold text-lg mr-1 text-white'>Fecha de Nacimiento:</span> {getFormattedDate(socio.fecha_nacimiento)}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Mail:</span> {socio.mail}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Telefono:</span> {socio.telefono}</p>
                            <hr className='border-gray-600' />
                            <p className='text-gray-300 text-sm'><span className='font-bold text-lg mr-1 text-white'>Cantidad de Reservas:</span> {socio.cantidad_reservas}</p>
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
        </section>
    )
}
