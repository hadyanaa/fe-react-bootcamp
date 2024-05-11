import { Button, Card, Col, Form, Image, InputNumber, List, message, Modal, Row, Spin } from "antd"
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons"
import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../Context/OrderContext"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom"

const Order = () => {
    const [user] = useContext(UserContext)
    const [userOrder,,loading] = useContext(OrderContext)
    const [saldo, setSaldo] = useState(0)
    const [idOrder, setIdOrder] = useState()
    const [spinButton, setSpinButton] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [alamat, setAlamat] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

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

    useEffect(()=>{
        const profile = async ()=>{
            setLoadingProfile(true)
            const result = await axios.get("https://glowthinc.vercel.app/api/profile", {headers: {"Authorization" : "Bearer "+ user.token}})
            .then((res)=>{
                return res.data
            })
            .catch((err)=>{
                console.log(err)
            })
            setAlamat(result)
            setLoadingProfile(false)
        }
        profile()

        const getSaldo = async ()=>{
            await axios.get("https://glowthinc.vercel.app/api/saldo", {headers: {"Authorization" : "Bearer "+ user.token}})
            .then((res) => {
                setSaldo(res.data)
              }).catch((err)=>{
                console.log(err)
            })
        }
        getSaldo()
        setIdOrder(userOrder[0]?.id)
        form.setFieldsValue({
            orderId: idOrder,
            kredit: totalHarga
        })
    }, [user.token, form, userOrder, idOrder, totalHarga])

    const onFinish = (values) => {
        setSpinButton(true)
        let sisaSaldo = saldo-values.kredit
        if (sisaSaldo >= 0 & alamat.alamat !== null) {
            axios.post(`https://glowthinc.vercel.app/api/transaction/${values.orderId}`, {kredit: values.kredit}, {headers: {"Authorization" : "Bearer "+ user.token}})
                .then(()=>{
                    navigate("/dashboard/order/user")
                    window.location.reload()
                    message.success("Pembayaran berhasil dilakukan")
                })
        } else if (sisaSaldo >= 0 & alamat.alamat === null) {
            setSpinButton(false)
            setIsModalOpen(true)
        } else {
            setSpinButton(false)
            setIsModalOpen(true)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        if (alamat.alamat === null){
            setIsModalOpen(false)
            navigate(`/dashboard/edit-profile`)
        } else {
            setIsModalOpen(false)
            navigate(`/dashboard/wallet`)
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const antIcon = (
        <LoadingOutlined
        style={{
            fontSize: 14,
            color: "white",
            marginLeft: "10px"
        }}
        spin
        />
    )

    return(
        <>
            <Row style={{paddingTop: "20px"}}>
                <Col span={8}>
                    <Button type="danger" style={{margin: "5px 0px 0px 120px"}} 
                            onClick={()=>{navigate(-1)}}>
                        <LeftOutlined/> Kembali
                    </Button>
                </Col>
                <Col span={8}>
                    <h1 style={{textAlign: "center", fontSize: "32px", color: "#48ADAF"}}>Order</h1>
                </Col>
                <Col span={8}></Col>
            </Row>
            <div className="content" style={{marginTop: "20px"}}>
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <List
                                    loading={loading}
                                    dataSource={userOrder[0]?.orderItems}
                                    renderItem={el=>(
                                        <List.Item>
                                            <Card className="card-shop-cart" style={{marginBottom: "20px"}}>
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
                                                        </Row>
                                                        <Row style={{marginTop: "30px"}}>
                                                            <Col span={12}></Col>
                                                            <Col span={4} style={{textAlign: "center"}}>
                                                                qty: {el.quantity}
                                                            </Col>
                                                            <Col span={4}>
                                                                {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(el.produk.harga*el.quantity)}
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
                        </Row>
                        <Row>
                            <Card className="card-order" loading={loadingProfile}>
                                <div className="card-order-header">
                                    <Row>
                                        <Col span={22}>
                                            <h2 className="product-detail-nama order-product-h2" style={{textAlign: "left", color: "#000000", fontSize: "15px", margin: "10px 0px 10px 20px"}}>Alamat pengiriman</h2>
                                        </Col>
                                        <Col span={2}>
                                            <Button style={{border: "0", marginTop: "10px"}}
                                                    icon={<EditOutlined style={{fontSize: "18px", color: "#70CACB"}}/>}
                                                    onClick={()=>{navigate("/dashboard/edit-profile")}}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="card-order-header">
                                    <p>{alamat.nama === null? "Anda belum mengisi nama" : alamat.nama}</p>
                                    <p>{alamat.phone === null? "Anda belum mengisi nomor handphone": alamat.phone}</p>
                                    <p>{alamat.alamat === null? "Anda belum mengisi alamat": alamat.alamat}</p>
                                </div>
                            </Card>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Form
                            name="order"
                            form={form}
                            labelCol={{span: 6}}
                            wrapperCol={{span: 22}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row>
                                <Card className="card-shop-cart" loading={loadingProfile} style={{height: "250px", marginLeft: "15px"}}>
                                    <h2 className="product-detail-nama order-product-h2" style={{color: "#000000", fontSize: "20px", margin: "20px 0"}}>Order Detail</h2>
                                    <Row style={{margin: "0px 35px"}}>
                                        <Col span={12}>
                                            <p style={{textAlign: "left"}}>Alamat</p>
                                        </Col>
                                        <Col span={12}>
                                            <p style={{textAlign: "right"}}>{alamat.alamat}</p>
                                        </Col>
                                    </Row>
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
                                        <Col span={12}>
                                            <p style={{textAlign: "left"}}>
                                                Total Harga
                                            </p>
                                        </Col>
                                        <Col span={12}>
                                            <p style={{textAlign: "right"}}>
                                            {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(totalHarga)}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                        style={{display: 'none'}}
                                        label="id order"
                                        name="orderId">
                                        <InputNumber/>
                                    </Form.Item>

                                    <Form.Item
                                        style={{display: 'none'}}
                                        label="Total Harga"
                                        name="kredit">
                                        <InputNumber/>
                                    </Form.Item>
                                </Card>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="card-shop-cart button-shop-cart" 
                                style={{width: "100%", margin: "0 17px"}}
                                >
                                    Bayar
                                    {spinButton ? <Spin indicator={antIcon}/> : ""}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Modal title={alamat.alamat === null ? "Alamat belum diisi :)" : "Saldo Tidak Cukup :("} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{alamat.alamat === null ? "Anda belum mengisi alamat" : `Saldo anda tidak mencukupi. Silahkan isi saldo terlebih dahulu. ` }</p>
                <p>Tekan Ok untuk {alamat.alamat === null ? "isi alamat" : `isi saldo. Sisa saldo anda: ${new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(saldo)}`}</p>
            </Modal>
        </>
    )

}

export default Order