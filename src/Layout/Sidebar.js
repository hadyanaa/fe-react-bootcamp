import { Layout, Menu} from "antd"
import { useContext } from "react"
import { useHref, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { DashboardOutlined, EditOutlined, AppstoreOutlined, BarsOutlined, UserOutlined, ShoppingOutlined, FileDoneOutlined, WalletOutlined } from "@ant-design/icons"

const { Sider } = Layout


const Sidebar = () => {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const path = useHref()
    let userMenu = []
    if(user !== null) {
        userMenu = user.role === "customer" ? [
            {
                label: "Wallet",
                icon: <WalletOutlined style={{fontSize: "20px"}}/>,
                key: "/dashboard/wallet"
            },
            {
                label: "Profil",
                icon: <UserOutlined style={{fontSize: "20px"}}/>,
                key: "/dashboard/profile"
            },
            {
                label: "Change Password",
                icon: <EditOutlined style={{fontSize: "20px"}}/>,
                key: "/dashboard/change-password"
            }
        ] : [
            {
                label: "Profil",
                icon: <UserOutlined style={{fontSize: "20px"}}/>,
                key: "/dashboard/profile"
            },
            {
                label: "Change Password",
                icon: <EditOutlined style={{fontSize: "20px"}}/>,
                key: "/dashboard/change-password"
            }
        ]
    }

    let menuSidebar = [
        {
            label: "Dashboard",
            icon: <DashboardOutlined style={{fontSize: "20px"}} />,
            key: "/dashboard"
        },
        {
            label: "Order Management",
            icon: <AppstoreOutlined style={{fontSize: "20px"}} />,
            key: "order-admin",
            children: [
                {
                    label: "Order",
                    icon: <ShoppingOutlined style={{fontSize: "20px"}} />,
                    key: "/dashboard/order"
                }
            ]
        },
        {
            
            label: "My Order",
            icon: <AppstoreOutlined style={{fontSize: "20px"}}/>,
            key: "order-user",
            children: [
                {
                    label: "Order",
                    icon: <ShoppingOutlined style={{fontSize: "20px"}} />,
                    key: "/dashboard/order/user"
                }
            ]
        },
        {
            label: "Product Management",
            icon: <BarsOutlined style={{fontSize: "20px"}} />,
            key: "product",
            children: [
                {
                    label: "Product",
                    icon: <FileDoneOutlined style={{fontSize: "20px"}}/>,
                    key: "/dashboard/product"
                },
                {
                    label: "Category",
                    icon: <FileDoneOutlined style={{fontSize: "20px"}}/>,
                    key: "/dashboard/category"
                }
            ]
        },
        {
            label: "User",
            icon: <UserOutlined style={{fontSize: "20px"}}/>,
            key: "user",
            children: userMenu
        }
    ]

    if(user !== null){
        if(user.role === "customer"){
            menuSidebar = menuSidebar.filter(e => e.key === "user" || e.key === "order-user" || e.key === "/dashboard")
        } else {
            menuSidebar = menuSidebar.filter(e => e.key !== "order-user")
        }
    }
    
    const HandleMenuSidebar = (props) => {
        navigate(props.key)
    }
    const sidebar = {}

    // get path
    const getPath = path.split('/')
    
    if(getPath[1] === 'dashboard') {
        return (
            <Sider width={250} className="site-layout-background" style={sidebar}>
                <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={[path]}
                defaultOpenKeys={["user", "order-user", "order-admin", "product"]}
                style={{
                    marginTop: "10px",
                    height: '100%',
                    borderRight: 0,
                }}
                items={menuSidebar}
                onClick={HandleMenuSidebar}
                key={menuSidebar.key}
                />                   
            </Sider> 
    )
    }
    
                
}

export default Sidebar