import { Row, Col, Button, Form, Input, Image, Spin, Alert } from "antd"
import { useNavigate } from "react-router-dom";
import{UserOutlined, KeyOutlined, LoadingOutlined} from '@ant-design/icons'
import ImageAuth from '../Image/image_auth.png'
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const Login = () => {
    const navigate = useNavigate()
    const [, setUser] = useContext(UserContext)
    const [spinButton, setSpinButton] = useState(false)
    const [error, setError] = useState(false)

    const onFinish = (values) => {
        setError(false)
        setSpinButton(true)
        axios.post("https://glowthinc.vercel.app/api/login", {...values})
            .then((res) => {
                let dataUser = res.data.user
                let token = res.data.token
                setUser({...dataUser, token})
                localStorage.setItem("user", JSON.stringify({...dataUser, token}))
                navigate("/dashboard")
            }).catch((err) => {
                setError(true)
                setSpinButton(false)
                console.log(err)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleRegister = () => {
        navigate("/register")
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

    return(
        <div className="content">
            <Row justify="space-around">
                <Col span={12}>
                    <Image width={500} src={ImageAuth} alt="login" preview={false}></Image>
                </Col>
                <Col span={12}>
                    <h1  style={{marginTop: "0px"}}>Login</h1>
                    <Row style={{marginBottom: "30px"}}>
                        <Col span={20}>
                            {
                                error && <Alert message="Your password or email is wrong!" type="error" closable showIcon/>
                            }
                        </Col>
                    </Row>
                    <Form
                        name="login"
                        labelAlign="left"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        
                        <Form.Item
                            label=""
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your email!'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Input email"/>
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[
                            {
                                required: true
                            },
                            
                            ]}
                        >
                            <Input.Password prefix={<KeyOutlined />} placeholder="Input password"/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                            span: 20,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{marginRight: "20px", backgroundColor: "#70CACB", border: "none"}}>
                                Submit {spinButton ? <Spin indicator={antIcon}/> : ""}
                            </Button>
                                or
                            <Button type="link" style={{marginRight: "20px"}} onClick={handleRegister}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login