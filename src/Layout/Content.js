import { Layout } from 'antd'
import LayoutFooter from './Footer'
import LayoutHeader from './Header'
import {BrowserRouter} from 'react-router-dom'
import FreeRoute from '../Routes/FreeRoute'
import Sidebar from './Sidebar'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import LoginRoute from '../Routes'


const { Content } = Layout

const Main = () => {
    const [user] = useContext(UserContext)
    return (
        <BrowserRouter>
            <Layout className='container'>
                <LayoutHeader/>
                <Layout>
                    <Sidebar/>
                    <Content>
                        {user ? <LoginRoute/> : <FreeRoute/>}
                    </Content>
                </Layout>
                <LayoutFooter/>
            </Layout>
        </BrowserRouter>
    )
}

export default Main