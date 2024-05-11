import { Button, Input, Form, message, Spin, Row, Col } from "antd"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { LoadingOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"

const FormProfile = () => {
    const [user] = useContext(UserContext)
    const [currentProfile, setProfil] = useState({nama: "", alamat: "", phone: ""})
    const [ready, setReady] = useState(false)
    const [spinButton, setSpinButton] = useState(false)
    const navigate = useNavigate()
  
    useEffect(() => {
            const currentProfile = async () => {
                await axios.get(`https://glowthinc.vercel.app/api/profile/`, {headers: {"Authorization" : "Bearer "+ user.token}})
                        .then(res => {
                            setProfil(res.data)
                            setReady(true)
                        }).catch((err) => {
                            console.log(err)
                        })
            } 
            currentProfile()
    }, [user.token])
    

    const onFinish = async (values) => {
            setSpinButton(true)
                console.log(values)

                await axios.put(`https://glowthinc.vercel.app/api/profile/`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                    .then((res) => {
                        message.success('Data edited successfully!')
                        navigate("/dashboard/profile")
                    }).catch((err)=>{
                        console.log(err)
                    })
    }

    const onFinishFailed = (error) => {
        console.log(error)
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
    );

    return (
        !ready ?
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
        <div className="content">
        <Form
        name="basic"
        labelAlign="left"
        labelCol={{
            span: 5
        }}
        wrapperCol={{
            span: 12,
        }}
        initialValues={{
            
            nama: currentProfile.nama,
            alamat: currentProfile.alamat,
            phone: currentProfile.phone
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Nama"
            name="nama"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Nama" />
        </Form.Item>
        <Form.Item 
            label="Alamat"
            name="alamat"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Alamat" />
        </Form.Item>
        <Form.Item 
            label="Telepon"
            name="phone"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 5,
                span: 12
              }
            }
        >
            <Button style={{backgroundColor: "#70CACB", border: "none"}} type="primary" htmlType="submit">
                Submit
                {spinButton ? <Spin indicator={antIcon}/> : ""}
            </Button>
        </Form.Item> 
        </Form>
        </div>
    )
}

export default FormProfile