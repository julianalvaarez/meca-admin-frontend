import React, { useContext, useState } from 'react';
import { Button, ConfigProvider, Form, Input, InputNumber, Alert, Select, Space } from 'antd';
import axios from 'axios';
import { MecaContext } from '../context/MecaContext';
import { useNavigate } from 'react-router';
const MyFormItemContext = React.createContext([]);
function toArr(str) {
    return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const options = ['gimnasio', 'academia_futbol', 'boxeo', 'academia_padel'].map((item) => ({ value: item, label: item }));


export const RegisterPage = () => {
    const navigate = useNavigate();
    const { getSocios, getActivities, setCreateAlert } = useContext(MecaContext);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [actividades, setActividades] = useState([])
    const [categoriaPadel, setCategoriaPadel] = useState('')

    const handleChange = (value) => {
        setActividades([...value]);
        console.log(actividades);
    };
    const handleClose = () => {
        setVisible(false);
        setError(false);
    };
    const onFinish = async ({ user }) => {
        const actividadToIdMap = {
            'gimnasio': 1,
            'academia_futbol': 2,
            'academia_padel': 3,
            'boxeo': 4,
        }
        const obtenerIdsActividades = (nombresActividades) => {
            return nombresActividades.map(nombre => actividadToIdMap[nombre]).filter(id => id !== undefined);
        };
        const idActividades = obtenerIdsActividades(actividades);
        console.log(idActividades);
        try {
            await axios.post('https://meca-admin-backend.onrender.com/socios', { ...user, idActividades, categoria_padel: categoriaPadel });
            setVisible(true);
            getSocios();
            getActivities()
            navigate(`/socio/${user.dni}`);
            setCreateAlert(true);
            setTimeout(() => {
                setCreateAlert(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };
    return (
        <section style={{ backgroundColor: '#001529', width: '100%' }}>
            <h1 className='font-bold text-3xl text-white text-center my-10'>REGISTRAR SOCIO</h1>
            <ConfigProvider theme={{
                token: {
                    colorBgContainer: '#001529', colorText: '#fff', colorBorder: 'rgb(75, 85, 99)', colorPrimary: '#001529', colorBgBase: '#001529', colorTextPlaceholder: 'rgb(75, 85, 99)', colorIcon: '#fff'
                }
            }}>
                < Form name="form_item_path" layout="vertical" onFinish={onFinish} style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
                    <MyFormItemGroup prefix={['user']}>
                        <MyFormItem name="nombre" label="Nombre Completo" rules={[
                            {
                                required: true,
                                message: 'El nombre es obligatorio',
                            },
                        ]}>
                            <Input placeholder='Nombre' />
                        </MyFormItem>
                        <MyFormItem name="dni" label="DNI" rules={[
                            {
                                required: true,
                                message: 'El DNI es obligatorio',
                            },
                        ]}>
                            <InputNumber style={{ width: '100%' }} placeholder='DNI' />
                        </MyFormItem>
                        <MyFormItem name="fecha_nacimiento" label="Fecha de Nacimiento" rules={[
                            {
                                required: true,
                                message: 'La fecha es obligatorio',
                            },
                        ]}>
                            <input type="date" placeholder='Fecha de Nacimiento' className='bg-transparent  border p-2 rounded-lg border-gray-600 w-full' />
                        </MyFormItem>
                        <MyFormItem name="telefono" label="Telefono" rules={[
                            {
                                required: true,
                                message: 'El telefono es obligatorio',
                            },
                        ]}>
                            <Input
                                placeholder='Telefono'
                                addonBefore="+54"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </MyFormItem>

                        <MyFormItem name="mail" label="Correo Electronico" rules={[
                            {
                                required: true,
                                message: 'El correo es obligatorio',
                            },
                        ]}>
                            <Input type="email" placeholder='Correo Electronico' />
                        </MyFormItem>
                        <MyFormItem name="notas" label="Notas Adicionales - Opcional">
                            <textarea className="w-full p-2 bg-transparent text-white outline-none resize-none border border-gray-500 rounded-md" style={{ minHeight: "60px" }} />
                        </MyFormItem>
                        {/* <MyFormItem name="cantidad_reservas" label="Cantidad de Reservas">
                            <InputNumber placeholder='Cantidad de Reservas' style={{ width: '100%' }} />
                        </MyFormItem> */}
                        <MyFormItem name='actividades' label='Actividades - Opcional'>
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
                                    }}
                                    placeholder="Actividades"
                                    onChange={handleChange}
                                    options={options}
                                />

                            </Space>
                        </MyFormItem>
                        <MyFormItem name="categoria_padel" label="Categoria Padel - Opcional">
                            <Space style={{ width: '100%' }} direction="vertical">
                                <Select
                                    defaultValue="Categoria"
                                    onChange={(value) => setCategoriaPadel(value)}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    options={[
                                        { value: 'octava', label: '8va' },
                                        { value: 'septima', label: '7ma' },
                                        { value: 'sexta', label: '6ta' },
                                        { value: 'quinta', label: '5ta' },
                                        { value: 'cuarta', label: '4ta' },
                                        { value: 'tercera', label: '3ra' },
                                        { value: 'segunda', label: '2da' },
                                        { value: 'primera', label: '1ra' },
                                    ]}
                                />
                            </Space>
                        </MyFormItem>
                    </MyFormItemGroup>

                    <Button type="primary" htmlType="submit">
                        Registrar
                    </Button>
                </Form>
            </ConfigProvider >
            {visible && (
                <Alert message="Socio Registrado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleClose}
                />
            )}
            {
                error && (
                    <Alert message="El socio o alguno de sus datos ya estan registrados" type="error" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleClose}
                    />
                )
            }

        </section >
    );
};