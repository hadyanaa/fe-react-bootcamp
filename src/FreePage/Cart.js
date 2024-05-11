import { Button, Card, Col, Empty, Image, List, message, Popconfirm, Row } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useContext } from "react"
import { OrderContext } from "../Context/OrderContext"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const [user] = useContext(UserContext)
    const [userOrder,,loading] = useContext(OrderContext)
    const navigate = useNavigate()
    
    
    if(!user===false){
        let qty = 0
        let totalHarga = 0
        
        if (userOrder[0] !== undefined){
            userOrder[0]?.orderItems?.map(function(item){
                return qty+=item.quantity
            })
    
            userOrder[0]?.orderItems?.map(function(item){
                return totalHarga+= (item.quantity*item.produk.harga)
            })
        }
    
        return(
            <>
                <Row style={{paddingTop: "20px"}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <h1 style={{textAlign: "center", fontSize: "32px", color: "#48ADAF"}}>Shop Cart</h1>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div className="content" style={{marginTop: "20px"}}>
                    <Row>
                        <Col span={16}>
                            <List
                                loading={loading}
                                dataSource={userOrder[0]?.orderItems}
                                renderItem={el=>(
                                    <List.Item>
                                        <Card className="card-shop-cart">
                                            <Row>
                                                <Col span={4}>
                                                    <Image 
                                                    src={el.produk.image_url} 
                                                    width={120}
                                                    height={120}
                                                    />
                                                </Col>
                                                <Col span={20}>
                                                    <Row style={{marginTop: "15px"}}>
                                                        <Col span={20}>
                                                            <h1>
                                                                {el.produk.nama}
                                                            </h1>
                                                        </Col>
                                                        <Col span={4} style={{textAlign: "center", marginTop: "-5px"}}>
                                                            <Button 
                                                                style={{border: "0"}}
                                                                icon={
                                                                    <EditOutlined style={{fontSize: "18px", color: "#70CACB"}}/>
                                                                }
                                                                onClick={() => {
                                                                    navigate(`/product/detail/${el.produk.id}`)
                                                                }}
                                                                />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: "30px"}}>
                                                        <Col span={12}></Col>
                                                        <Col span={4} style={{textAlign: "center"}}>
                                                            qty: {el.quantity}
                                                        </Col>
                                                        <Col span={4}>
                                                            {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(el.produk.harga*el.quantity)}
                                                        </Col>
                                                        <Col span={4} style={{textAlign: "center", marginTop: "-5px"}}>
                                                            <Popconfirm
                                                                title="Are you sure to delete this product?"
                                                                onConfirm={(e)=>{
                                                                    axios.delete(`https://glowthinc.vercel.app/api/orderItem/${el.id}`, {headers: {"Authorization" : "Bearer "+ user.token}})
                                                                    .then(()=>{
                                                                        window.location.reload()
                                                                        message.success("Data has been deleted successfully")
                                                                    })
                                                                }}
                                                                okText="Yes"
                                                                cancelText="No"
                                                                >
                                                                <Button
                                                                    style={{border: "0"}} 
                                                                    icon={
                                                                        <DeleteOutlined style={{fontSize: "18px", color: "red"}}/>
                                                                    }
                                                                    />
                                                            </Popconfirm>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                                >
                            </List>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Card className="card-shop-cart" style={{height: "180px", marginLeft: "15px"}}>
                                    <h2 className="product-detail-nama order-product-h2" 
                                        style={{color: "#000000", fontSize: "20px", margin: "20px 20px"}}>
                                        Ringkasan Belanja
                                    </h2>
                                    <Row style={{margin: "0px 35px"}}>
                                        <Col span={12}>
                                            <p style={{textAlign: "left"}}>Total Barang</p>
                                        </Col>
                                        <Col span={12}>
                                            <p style={{textAlign: "right"}}>{qty}</p>
                                        </Col>
                                    </Row>
                                    <hr style={{margin: "5px"}}/>
                                    <Row style={{margin: "0px 35px"}}>
                                        <Col span={16}>
                                            <p style={{textAlign: "left"}}>
                                                Total Harga
                                            </p>
                                        </Col>
                                        <Col span={8}>
                                            <p style={{textAlign: "right"}}>
                                            {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(totalHarga)}
                                            </p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                            <Row>
                                <Button style={{margin: "0 15px"}} type="primary" className="card-shop-cart button-shop-cart" onClick={()=>{
                                    if (qty === 0) {
                                        navigate(`/product`)
                                    } else {
                                        navigate(`/order`)
                                    }
                                }}>
                                    Beli
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
        )

    }else{
        return(
            <>
                <Row style={{paddingTop: "20px"}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <h1 style={{textAlign: "center", fontSize: "32px", color: "#48ADAF"}}>Shop Cart</h1>
                    </Col>
                    <Col span={8}></Col>
                </Row> 
                <div className="content" style={{marginTop: "20px"}}>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                        height: 60,
                        }}
                        description={
                        <span>
                            Silahkan login untuk melakukan pembelian
                        </span>
                        }
                    >
                        <Button type="primary" className="card-shop-cart button-shop-cart"
                                style={{width: "120px", height: "40px"}} 
                                onClick={()=>{
                                    navigate(`/login`)
                                }}
                        >
                            Login sekarang
                        </Button>
                    </Empty>
                    
                </div>
            </>
        )
    }
    
}

export default Cart