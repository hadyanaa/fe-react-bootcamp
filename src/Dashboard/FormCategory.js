import { Button, Input, Form, message, Spin } from "antd"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { LoadingOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"

const FormCategory = () => {
    const [user] = useContext(UserContext)
    const [currentName, setName] = useState({name: ""})
    const [ready, setReady] = useState(false)
    const [spinButton, setSpinButton] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
        if(id) {
            const currentCategory = async () => {
                await axios.get(`https://glowthinc.vercel.app/api/categories/${id}`)
                        .then(res => {
                            setName(res.data)
                            setReady(true)
                        }).catch((err) => {
                            console.log(err)
                        })
            } 
            currentCategory()
        }else{
            setReady(true)
        }
    }, [id])
    

    const onFinish = async (values) => {
            setSpinButton(true)
            if(!id){
                await axios.post(`https://glowthinc.vercel.app/api/categories`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                    .then((res) => {
                        message.success('Data added successfully!')
                        navigate("/dashboard/category")
                    }).catch((err)=>{
                        message.error('Category name already exists!')
                        console.log(err)
                    })
            } else {
                await axios.put(`https://glowthinc.vercel.app/api/categories/${id}`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                    .then((res) => {
                        message.success('Data edited successfully!')
                        navigate("/dashboard/category")
                    }).catch((err)=>{
                        message.error('Category name already exists!')
                        console.log(err)
                    })
            }
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
        ready &&
        <Form
        name="basic"
        labelAlign="left"
        labelCol={{
            span: 3
        }}
        wrapperCol={{
            span: 12,
        }}
        initialValues={{
            name: currentName.name
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Name"
            name="name"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Please input category name..." />
        </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 3,
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
    )
}

export default FormCategory