import { Row, Col, Button, Spin, Avatar, Card } from "antd"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"
import { EditOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Profile = () => {
    const navigate = useNavigate()
    const [user] = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [spin, setSpin] = useState(true)

    useEffect(() => {
        const profile = async () => {
            await axios.get("https://glowthinc.vercel.app/api/profile", {headers: {"Authorization" : "Bearer "+ user.token}})
                .then(res => {
                    // let data = res.data
                    setProfile(res.data)
                    setSpin(false)
                }).catch(err => {
                    console.log(err)
                })
        }

        profile()
    },[user.token])

    console.log(profile)

    const EditProfile = () => {
        navigate("/dashboard/edit-profile")
      }

    return (
        spin ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
        <div className="dashboard-content">
            <Button type="primary" icon={<EditOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={EditProfile}>Edit Profile</Button>
                <Card
                    className="card-profile"
                    style={{
                    width: 450,
                    display: "block",
                    textAlign: "left"
                    }}
                    cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    }
                >
                    <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={profile.nama + " - " + profile.phone }
                    description={profile.alamat}
                    />
                </Card>      
            
            </div>
    )
}

export default Profile