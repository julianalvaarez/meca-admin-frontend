import { Layout, theme, } from 'antd';
const { Header, Content } = Layout;
import mecalogocompleto from '../assets/mecalogocompleto.png';
import { MainContent } from '../components/MainContent';
import { Link } from 'react-router';
export const HomePage = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const color = '#001529'
    return (
        <>
            <Layout style={{ background: '#001529', minHeight: '100vh' }}>
                <Header
                    style={{
                        padding: 0,
                        height: 'auto',
                        background: '#001529',
                    }}
                    className='flex flex-col items-center'
                >
                    <nav className='text-white font-semibold  w-full p-5'>
                        <ul className='flex gap-14 justify-center'>
                            <li><Link to={"/registrar-socio"} >REGISTRAR SOCIO</Link></li>
                            <li><Link to={"/actividades"} >ACTIVIDADES</Link></li>
                        </ul>
                    </nav>
                    {/* <h1 className='font-bold text-3xl text-blue-900 mt-10'>ADMINISTRACION DE SOCIOS</h1> */}
                    <img src={mecalogocompleto} alt="Logo La Meca" width={300} />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <MainContent />
                    </div>
                </Content>
            </Layout>
        </>
    )
}
