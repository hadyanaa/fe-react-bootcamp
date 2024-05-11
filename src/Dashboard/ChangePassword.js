import { Button, Input, Form, message, Spin, Col, Alert, Row} from "antd"
import axios from "axios"
import { useContext, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/UserContext"
import React from "react"

const ChangePassword = () => { 
    let formRef = React.createRef()
    const [user] = useContext(UserContext)
    const [spinButton, setSpinButton] = useState(false)
    const [error, setError] = useState(false)


    const onFinish = async (values) => {
        setError(false)
        setSpinButton(true)
        await axios.put(`https://glowthinc.vercel.app/api/change-password`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
        .then((res) => {
            message.success("Password changed")
            window.location.reload()
            setSpinButton(false)    
        }).catch((err)=>{
            setError(true)
            setSpinButton(false)
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
    )

    return (
        <div className="content">
            <Row style={{marginBottom: "30px"}}>
                        <Col span={20}>
                            {
                                error && <Alert message="Your password is wrong or doesn't match!" type="error" closable showIcon/>
                            }
                        </Col>
                    </Row>
        <Form
        ref={formRef}
        name="basic"
        labelCol={{
            span: 7
        }}
        labelAlign = "left"
        wrapperCol={{
            span: 10,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Current Password"
            name="currentPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="Please input current password..." />
        </Form.Item>
        <Form.Item 
            label="New Password"
            name="newPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="Please input new password..." />
        </Form.Item>
        <Form.Item 
            label="Confirm New Password"
            name="confirmNewPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="Please input confirm new password..." />
        </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 7,
                span: 10
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

export default ChangePassword