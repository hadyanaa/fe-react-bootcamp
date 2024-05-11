import { Button, Carousel, Col, Image, Row, Card, Space, Skeleton } from "antd"
import Banner1 from '../Image/banner1.jpg'
import Banner2 from '../Image/banner2.jpg'
import Banner3 from '../Image/banner3.jpg'
import Footer1 from "../Image/footer.jpg"
import Halal from "../Image/icon_halal.png"
import Alcohol from "../Image/icon_alcohol.png"
import Local from "../Image/icon_local.png"
import Cruelty from "../Image/icon_cruelty.png"
import Natural from "../Image/icon_natural.png"
import Content1 from "../Image/content_icon1.jpg"
import Content2 from "../Image/content_icon2.jpg"
import Content3 from "../Image/content_icon3.jpg"
import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [spin, setSpin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getCategory = async () => {
            await axios.get("https://glowthinc.vercel.app/api/categories")
              .then((res) => {
                setCategory(res.data)
                // setSpin(false)
              }).catch((err)=>{
                console.log(err)
              })
        } 
        getCategory()    

        const getProduct = async () => {
            await axios.get("https://glowthinc.vercel.app/api/product")
              .then((res) => {
                setProduct(res.data)
                setSpin(false)
              }).catch((err)=>{
                console.log(err)
              })
        } 
        getProduct()   
      }, [])

      const HandleAllProduct = () => {
        navigate("/product")
      }

    return (
        <div className="home">
            <Carousel autoplay="true">
                <div className="banner">
                    <Image preview={false} src={Banner1}></Image>
                </div>
                <div className="banner">
                    <Image preview={false} src={Banner2}></Image>
                </div>
                <div className="banner">
                    <Image preview={false} src={Banner3}></Image>
                </div>
            </Carousel>
            <div className="content">
                <h1 style={{textAlign: "center"}}>Why Glow Thinc</h1>
                <Row justify="center" align="middle" className="icon">
                    <Col span={4}>
                        <Image preview={false} src={Halal}></Image>
                        <h3>Halal</h3>
                    </Col>
                    <Col span={4}>
                        <Image preview={false} src={Natural}></Image>
                        <h3>Natural</h3>
                    </Col>
                    <Col span={4}>
                        <Image preview={false} src={Alcohol}></Image>
                        <h3>Alcohol Free</h3>
                    </Col>
                    <Col span={4}>
                        <Image preview={false} src={Local}></Image>
                        <h3>Local & Global Expert</h3>
                    </Col>
                    <Col span={4}>
                        <Image preview={false} src={Cruelty}></Image>
                        <h3>Cruelty Free</h3>
                    </Col>
                </Row>
                <Row className="imagehome" gutter={24} style={{marginTop: "100px"}} justify="space-around" align="middle">
                    <Col span={8}>
                        <Image src={Content1}></Image>
                    </Col>
                    <Col span={8}>
                        <Image src={Content2}></Image>
                    </Col>
                    <Col span={8}>
                        <Image src={Content3}></Image>
                    </Col>
                </Row>
                <h1 style={{textAlign: "center", marginTop: "100px"}}>Our Products</h1>
                {
                    spin ? <>
                    <Space>
                    <Skeleton.Button active/>
                    <Skeleton.Button active/>
                    </Space>
                    <Row>
                        <Col span={6}>
                        <Card 
                           bordered={true}
                        >
                            <Skeleton active/>
                        </Card>                                        
                            <Skeleton/>
                        </Col>
                        <Col span={6}>
                        <Card 
                           bordered={true}
                        >
                            <Skeleton active/>
                        </Card>                                        
                            <Skeleton/>
                        </Col>
                        <Col span={6}>
                        <Card 
                           bordered={true}
                        >
                            <Skeleton active/>
                        </Card>                                        
                            <Skeleton/>
                        </Col>
                        <Col span={6}>
                        <Card 
                           bordered={true}
                        >
                            <Skeleton active/>
                        </Card>                                        
                            <Skeleton/>
                        </Col>
                    </Row>
                    </> :
                    category.map( e => {
                        let column = 0
                        return(
                            <Row style={{marginBottom: "20px"}}>
                                <Row span={24} style={{width: "100%"}}>
                                <Button type="primary" htmlType="submit" style={{marginRight: "20px", backgroundColor: "#70CACB", border: "none"}}>{e.name}</Button>
                                <Button type="primary" htmlType="submit" style={{marginRight: "20px", backgroundColor: "#70CACB", border: "none"}} onClick={HandleAllProduct}>View All Product</Button>
                                </Row>
                                <Row gutter={24} style={{width: "100%", marginTop: "10px"}}>
                                    {product.map((el) => {
                                            if( e.id === el.category_id){
                                                column += 1
                                                return (
                                                    column <= 4  ?
                                                        <Col span={6}>
                                                            <Card 
                                                                key={el.id}
                                                                bordered={true}
                                                                cover={<img src={el.image_url} alt={el.nama}></img>}>
                                                                <h1 style={{textOverflow: "ellipsis"}}>
                                                                    {el.nama}
                                                                </h1>
                                                                <h1 style={{fontWeight: "700"}}>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(el.harga)}</h1>
                                                                <h1><a style={{color: "#48ADAF"}} href={`/product/detail/${el.id}`}>View More</a></h1>
                                                            </Card>
                                                        </Col>
                                                
                                                    : ""
                                                )
                                            }
                                        return ""
                                    })}
                                </Row>
                            </Row>
                        )
                    })
                }
            </div>
            <Row>
                <Col span={12}>
                    <Image preview={false} src={Footer1}></Image>
                </Col>
                <Col span={12}>
                    <div className="gradient">
                        <h1 style={{textAlign: "left", paddingTop: "30%", color: "#3E8D9B", fontSize: "30px", paddingLeft: "40px"}}>Dapatkan kulit bersih dan putih dengan produk #TERBAIK kami.</h1>
                        <Button type="primary" size="large" style={{marginLeft: "40px", backgroundColor: "#3E8D9B"}}>Shop Now</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home