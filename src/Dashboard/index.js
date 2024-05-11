import { Badge, Card, Row, Col, Button, Skeleton } from 'antd';
import { UserContext } from "../Context/UserContext";
import { useEffect, useContext, useState } from 'react';
import { VerticalAlignBottomOutlined, ShoppingOutlined} from "@ant-design/icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const [saldo, setSaldo] = useState([])
    const navigate = useNavigate()
    const [user] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    const [spin, setSpin] = useState(true)

    useEffect(() => {        
        if(user.role === "customer"){
            const getOrders = async () => {
                await axios.get("https://glowthinc.vercel.app/api/order", {headers: {"Authorization" : "Bearer "+ user.token}})
                  .then((res) => {
                    setOrders(res.data)
                    setSpin(false)
                  }).catch((err)=>{
                    console.log(err)
                  })
            } 
            getOrders() 

            const getSaldo = async () => {
                await axios.get("https://glowthinc.vercel.app/api/saldo", {headers: {"Authorization" : "Bearer "+ user.token}})
                  .then((res) => {
                    setSaldo(res.data)
                  }).catch((err)=>{
                    console.log(err)
                  })
                } 
            getSaldo()   
        } else {
            const getOrders = async () => {
                await axios.get("https://glowthinc.vercel.app/api/orders", {headers: {"Authorization" : "Bearer "+ user.token}})
                  .then((res) => {
                    setOrders(res.data)
                    setSpin(false)
                  }).catch((err)=>{
                    console.log(err)
                  })
            } 
            getOrders()  

            const getSaldo = async () => {
                await axios.get("https://glowthinc.vercel.app/api/saldo-admin", {headers: {"Authorization" : "Bearer "+ user.token}})
                  .then((res) => {
                    setSaldo(res.data)
                  }).catch((err)=>{
                    console.log(err)
                  })
                } 
            getSaldo()   
        }   
    })

    let ordersDone = []
                   
    let ordersWaitingForDelivery = []

    let ordersInDelivery = []

    if(!spin){
        orders.forEach(e => {
          const history = e.histories.sort((a, b) => {return b.id - a.id})
          if(history.length > 0 ){
                if(history[0].status === "Transaksi berhasil"){
                    ordersDone.push(e)
                } else if (history[0].status === "Pembayaran berhasil"){
                    ordersWaitingForDelivery.push(e)
                } else if (history[0].status === "Barang sedang dikirim"){
                    ordersInDelivery.push(e)
                }
            }
        })
      }

    const handleSaldo = () => {
        navigate('/dashboard/wallet')
    }

    const handleOrders = () => {
        if(user.role === "customer"){
            navigate('/dashboard/order/user')
        } else {
            navigate('/dashboard/order')
        }
        
    }

    let description = "Saldo"
    if(user.role === "superadmin"){
        description = "Income"
    }

    return(
        <div className="dashboard-content">
            {
                user.role === "customer" || "superadmin" ?
                <Row gutter={[24, 24]}>
                    <Col span={8}>
                    <Badge.Ribbon text={description} color='cyan'>
                        {
                            spin ? <Skeleton active /> :
                            <Card className='card-dashboard' style={{height: "200px"}} title="" size="small">
                                <h1>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(saldo)}</h1>
                                {
                                    user.role === "customer" ?
                                    <Button type="primary" icon={<VerticalAlignBottomOutlined style={{fontSize: "20px"}} />} size="large" style={{marginTop: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={handleSaldo}>Top Up</Button> :
                                    ""
                                }
                                
                            </Card>
                        }
                        
                    </Badge.Ribbon>
                    </Col>
                </Row> :
                ""
            }
            
            <Row gutter={[24, 24]} style={{marginTop: "30px"}}>
                <Col span={8}>
                <Badge.Ribbon text="Waiting For Delivery" color='cyan'>
                    {
                        spin ? <Skeleton active /> :
                        <Card className='card-dashboard' style={{height: "200px"}} title="" size="small">
                        <h1>{ordersWaitingForDelivery.length}</h1>
                        <Button type="primary" icon={<ShoppingOutlined style={{fontSize: "20px"}} />} size="large" style={{marginTop: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={handleOrders}>Detail</Button>
                        </Card>
                    }
                    
                </Badge.Ribbon>
                </Col>
                <Col span={8}>
                <Badge.Ribbon text="In Delivery" color='cyan'>
                {
                        spin ? <Skeleton active /> :
                        <Card className='card-dashboard' style={{height: "200px"}} title="" size="small">
                        <h1>{ordersInDelivery.length}</h1>
                        <Button type="primary" icon={<ShoppingOutlined style={{fontSize: "20px"}} />} size="large" style={{marginTop: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={handleOrders}>Detail</Button>
                        </Card>
                    }
                    
                </Badge.Ribbon>
                </Col>
                <Col span={8}>
                <Badge.Ribbon text="Done" color='cyan'>
                {
                        spin ? <Skeleton active /> :
                        <Card className='card-dashboard' style={{height: "200px"}} title="" size="small">
                        <h1>{ordersDone.length}</h1>
                        <Button type="primary" icon={<ShoppingOutlined style={{fontSize: "20px"}} />} size="large" style={{marginTop: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={handleOrders}>Detail</Button>
                        </Card>
                    }
                    
                </Badge.Ribbon>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard