import { Row, Col, Image } from "antd"
import gambarBeauty from '../Image/beauty_store_1.svg'
import BannerProduct from '../Image/ourproduct.jpg'

const About = () => {
    return(
        <>
         <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 style={{marginLeft: "50px"}} className="caption">ABOUT</h1>
        </div>
        <div className="content">
            <Row >
                <Col span={12} style={{padding: "0", margin: "20px 0"}}>
                    <img alt="about" src={gambarBeauty} style={{width: "640px", height: "474px", marginBottom: "40px"}}></img>
                </Col>
                <Col span={12} style={{padding: "0px 0px 20px 30px", marginTop: "20px", color: "#9B8EAD"}}>
                    <p style={{textAlign: "justify"}}>
                    Glow Thinc merupakan #1 Curated Beauty e-Commerce yang ingin membuat pengalaman berbelanja Anda menjadi simple & cepat, semuanya dalam 1 click.
                    <br/>
                    <hr/>
                    <b>VISION</b> 
                    <br/>
                    #1 Beauty Ekosistem yang saling terintegrasi mulai dari Review, Blog, Forum, Penjualan dan Events.
                    <br/>
                    <hr/>
                    <b>MISSION</b>
                    <br/>
                    Membantu semua orang menjadi cantik & mendapatkan produk-produk kecantikan terbaik yang telah dikurasi secara ketat dengan harga yang terjangkau.
                    Membantu membesarkan lokal brand dari Indonesia untuk bisa masuk ke pasar internasional.
                    </p>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default About