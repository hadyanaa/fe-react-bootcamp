import { Button, Col, Form, Image, InputNumber, message, Row, Skeleton, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import BannerProduct from '../Image/ourproduct.jpg'

const DetailProduct = () => {
    let {id} = useParams()
    const [user] = useContext(UserContext)
    const [product, setProduct] = useState({})
    const [disable, setDisable] = useState(false)
    const [spinButton, setSpinButton] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [qty, setQty] = useState(1)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(()=>{
        setLoadingProduct(true)
        const fetchData = async () => {
            let result = await axios.get(`https://glowthinc.vercel.app/api/product/${id}`)
            let dataProducts = result.data
            setProduct(dataProducts)
            setLoadingProduct(false)
        }
        fetchData()
        if (product.stok <= 0) {
            setDisable(true)
        } else {
            setDisable(false)
        }
        form.setFieldsValue({
            productId: product.id
        })
    }, [id, form, product.id, product.stok])
    
    const onFinish = (values) => {
        setSpinButton(true)
        axios.post("https://glowthinc.vercel.app/api/order", {...values}, {headers: {"Authorization" : "Bearer "+ user.token}})
            .then((res)=>{
                navigate("/cart")
                window.location.reload()
                message.success("Product has been added successfully")
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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

    const handleQty = (values) => {
        setQty(values)
    }
    

    return (
        <>
        <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 className="caption">DETAIL PRODUCT</h1>
        </div>

        <div className="content">
            <Row>
                <Col span={5} style={{margin: "10px"}}>
                    <Image src={product.image_url}></Image>
                </Col>
                <Col span={11} style={{background: "#F5F1EC", margin: "10px"}}> 
                    {loadingProduct ? <Skeleton className="product-detail" active/> :
                        <div className="product-detail">
                            <h2 className="product-detail-category">{product?.categoryProduct?.name}</h2>
                            <h3 className="product-detail-nama"> {String(product.nama).toUpperCase()}</h3>
                            <h3 className="product-detail-category" style={{fontWeight: "600"}}>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(product.harga)}</h3>
                            <br/>
                            <h2 className="product-detail-category">Description</h2>
                            <p className="product-detail-category">{product.deskripsi}</p>
                        </div>
                    }
                </Col>
                <Col span={6} style={{background: "#F5F1EC", margin: "10px"}}>
                    <div className="order-product">
                        <h2 className="product-detail-nama order-product-h2">ORDER</h2>
                        <br/>
                        <Form
                            name="order"
                            form={form}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            initialValues={{
                                quantity: 1
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <h2 className="product-detail-category">Quantity</h2>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        name="quantity"
                                    >
                                        <InputNumber disabled={disable} max={product.stok} min={1} onChange={handleQty}/>
                                    </Form.Item>
                                </Col>
                                <Col span={14} style={{padding: "6px"}}>
                                    <h2 className="product-detail-category" style={{fontSize: "16px"}}>/ {product.stok}</h2>
                                </Col>
                            </Row>

                            <Form.Item
                                style={{display: 'none'}}
                                label="id produk"
                                name="productId"
                            >
                                <InputNumber/>
                            </Form.Item>
    
                            <h2 className="product-detail-category">Total</h2>             
                            <h3 className="product-detail-category" style={{fontWeight: "600"}}>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(product.harga*qty)}</h3>               
                            <br/>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginRight: "20px", backgroundColor: "#70CACB", border: "none"}} disabled={disable}>
                                    Add to cart
                                    {spinButton ? <Spin indicator={antIcon}/> : ""}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default DetailProduct;