import React, { useContext, useEffect, useState } from 'react';
import { Menu, Input, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router';
import { MecaContext } from '../context/MecaContext';
import mecalogo from '../assets/mecalogo.png';
const { Search } = Input;
const { Sider } = Layout;

export const Sidebar = () => {
    const navigate = useNavigate()
    const { socios } = useContext(MecaContext)
    const [sociosEncontrados, setSociosEncontrados] = useState(socios)
    const [itemSeleccionado, setItemSeleccionado] = useState(null)

    const items = sociosEncontrados.map(
        (socio, index) => ({
            key: String(index + 1),
            icon: React.createElement(UserOutlined),
            label: socio.nombre,
            dni: socio.dni
        }),
    );

    const onSearch = (value, _e) => {
        if (!value) {
            setSociosEncontrados(socios)
            return
        }
        const result = socios.filter(s => s.nombre.toLowerCase().includes(value.toLowerCase()))
        if (result.length === 0) {
            setSociosEncontrados([])
        }
        setSociosEncontrados(result)

    }


    const handleMenuClick = async (e) => {
        // Encuentra el objeto del ítem seleccionado usando la key
        const itemInfo = items.find((item) => item.key === e.key);
        setItemSeleccionado(itemInfo); // Guarda el objeto seleccionado en el estado

        navigate(`/socio/${itemInfo.dni}`)
    };


    useEffect(() => {
        setSociosEncontrados(socios)
    }, [socios])


    return (
        <Sider
            style={{ minHeight: '100vh', overflow: 'auto', borderRight: '1px solid #888888', marginBottom: 0 }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
            <div className="demo-logo-vertical" />
            <Link to={"/"}>
                <img src={mecalogo} alt="Logo Meca" style={{ width: '60%', marginTop: '20px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            </Link>
            <Search
                placeholder="Busca un socio"
                onSearch={onSearch}
                style={{ width: '100%', padding: '10px' }}
            />
            {sociosEncontrados.length === 0 ? <span>No se encontraron socios</span> : <Menu theme="dark" mode="inline" items={items} onClick={handleMenuClick} />}
        </Sider>
    )
}
