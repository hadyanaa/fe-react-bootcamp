import { Layout, Row, Col } from "antd"
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, GoogleOutlined } from "@ant-design/icons"
const { Footer } = Layout
function LayoutFooter(){
    return (
        <Footer>
            <Row>
                <Col span={7}>
                    <h3>About Us</h3>
                    <p>Partner terbaikmu untuk mendapatkan kulit yang cerah dan mulus. Kami akan memberikan skincare berkualitas dan tentunya aman</p>
                </Col>
                <Col span={4}/>
                <Col className="quicklink" span={6}>
                    <h3>Quick Link</h3>
                    <p><a href="/" style={{color: "white"}}> Home</a></p>
                    <p><a href="/about" style={{color: "white"}}>About</a></p>
                    <p><a href="/contact" style={{color: "white"}}>Contact</a></p>
                    <p><a href="/dashboard/order/user" style={{color: "white"}}>Orders</a></p>
                    <p><a href="/cart" style={{color: "white"}}>Cart</a></p>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                    <h3>Connect With Us</h3>
                    <Row style={{fontSize: "25px"}}>
                    <Col span={6}><a href="https://www.instagram.com/" style={{color: "white"}}><InstagramOutlined/></a></Col>
                    <Col span={6}><a href="https://twitter.com/" style={{color: "white"}}><TwitterOutlined/></a></Col>
                    <Col span={6}><a href="https://www.facebook.com/" style={{color: "white"}}><FacebookOutlined/></a></Col>
                    <Col span={6}><a href="https://www.google.com/" style={{color: "white"}}><GoogleOutlined /></a></Col>
                    </Row>
                </Col>
            </Row>
        </Footer>
    )
}


export default LayoutFooter