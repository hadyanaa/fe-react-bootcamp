import React, { useContext } from "react"
import { Layout, Row, Col, Menu, Badge } from "antd"
import logo from '../Image/GLOWTHINC.svg'
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { OrderContext } from "../Context/OrderContext"

const { Header } = Layout

function LayoutHeader(){
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [userOrder] = useContext(OrderContext)

    let userChildren = [
        { label: "Login", key: "/login"},
        { label: "Register", key: "/register"},
        { label: "Dashboard", key: "/dashboard"},
        { label: "Logout", key: "/logout"}
    ]

    // filter menu user
    if(user) {
        userChildren = userChildren.filter((data) => data.label === "Logout" || data.label === 'Dashboard' )
    } else {
        userChildren = userChildren.filter((data) => data.label !== "Logout" && data.label !== 'Dashboard')
    } 

    const menuItems=[
        {label: "Home", key: "/"},
        {label: "Product", key: "/product"},
        {label: "About", key: "/about"},
        {label: "Contact", key: "/contact"},
        {
            label:  user !== null && <Badge count={userOrder ? userOrder.length > 0 ? userOrder[0].orderItems.length : 0 : ""}>
                        <ShoppingCartOutlined style={{fontSize: "22px", color: "#9B8EAD"}}/>
                    </Badge>, 
            key: "/cart"},
        {
            label: <UserOutlined style={{fontSize: "20px", color: "#9B8EAD"}}/>, 
            key: "usermenu",
            children: userChildren.map(e => e)
               
        
        }
    ]

    // Header Menu
    const HandleNavigate = (props) => {
        if(props.key === "/logout") {
            setUser(null)
            localStorage.clear()
            navigate("/login")
        }else {
            navigate(props.key)
        }
    }

    // logo Button
    const HandleLogo = () => {
        navigate('/')
    }

    return(
        <Header>
            <Row>
                <Col span={4}><img className="logo" onClick={HandleLogo} alt="logo" src={logo}></img></Col>
                <Col className="sideheader" span={20}>
                    <Menu className="font-inter" style={{fontSize: "14px", color: "#9B8EAD", paddingRight: "2px"}} mode="horizontal" items={menuItems} key={[menuItems.key]} onClick={HandleNavigate}></Menu>
                </Col>
            </Row>
        </Header>
    )

}

export default LayoutHeader