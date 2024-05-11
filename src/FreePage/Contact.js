import { Row, Col, Timeline, Image } from "antd"
import gambar1 from '../Image/contact.svg'
import { WhatsAppOutlined, InstagramOutlined, MailOutlined, 
    GoogleOutlined, FacebookOutlined, TwitterOutlined 
} from "@ant-design/icons"
import BannerProduct from '../Image/ourproduct.jpg'

const Contact = () => {
    return(
        <>
        <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 style={{marginLeft: "30px"}} className="caption">CONTACT</h1>
        </div>
        <div className="content">
            <Row>
                <Col span={12} style={{padding: "0", margin: "20px 0"}}>
                    <img src={gambar1} style={{width: "650px", height: "335px", marginBottom: "40px"}} alt="contact"></img>
                    <Row style={{fontSize: "24px"}}>
                        <Col span={2}>
                            <WhatsAppOutlined /> 
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>081959106630</p>
                        </Col>
                        <Col span={2}>
                            <InstagramOutlined/>
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>@glowThinc</p>
                        </Col>
                        <Col span={2}>
                            <MailOutlined/>
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>glowthinc@gmail.com</p>
                        </Col>
                    </Row>
                    <Row style={{fontSize: "24px"}}>
                        <Col span={2}>
                            <GoogleOutlined/> 
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>Glow Thinc</p>
                        </Col>
                        <Col span={2}>
                            <FacebookOutlined/>
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>Glow Thinc</p>
                        </Col>
                        <Col span={2}>
                            <TwitterOutlined/>
                        </Col>
                        <Col span={6} style={{paddingTop: "6px"}}>
                            <p style={{fontSize: "16px"}}>@glowThinc</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={12} style={{padding: "0px 0px 0px 40px", marginTop: "20px", color: "#9B8EAD"}}>
                    <h3 style={{color: "#9B8EAD"}}>Perjalanan Kami</h3>
                    <br/>
                    <Timeline style={{color: "#9B8EAD"}}>
                        <Timeline.Item>
                            Glow Thinc didirikan pada tanggal 15 November 2022 oleh empat orang , sebagai bisnis beauty and skincare. Awal pendirian Glow Thinc menjual produk melalui instagram, whatsapp, dan shopee.
                        </Timeline.Item>
                        <Timeline.Item>
                            Pengembangan bisnis dengan merambah ke marketplace Tokopedia dan Lazada.
                        </Timeline.Item>
                        <Timeline.Item>
                            Glow Thinc memanfaatkan TikTok sebagai media marketing. Antusiasme netizen tiktok akhirnya kami memutuskan untuk melakukan pengembangan bisnis dengan membuka toko online di Tiktok Shop.
                        </Timeline.Item>
                        <Timeline.Item>
                            Tunggu layanan kami selanjutnya...
                        </Timeline.Item>
                    </Timeline>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default Contact