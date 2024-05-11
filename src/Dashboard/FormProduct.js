import { Button, Input, Form, message, InputNumber, Select, Row, Col, Spin} from "antd"
import { useParams, useNavigate } from "react-router-dom"
import { LoadingOutlined } from "@ant-design/icons"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../Context/ProductContext"

const { TextArea } = Input
const { Option } = Select

const FormProduct = () => {
    const [user] = useContext(UserContext)
    const [currentProduct, setProduct] = useState({
        nama: "",
        harga: null,
        deskripsi: "",
        stock: 1,
        image: "",
        category_id: null
    })
    const [category, setCategory] = useState([])
    const [ready, setReady] = useState(false)
    const [,,,,,setTrigger] = useContext(ProductContext)
    const [spinButton, setSpinButton] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
        const allCategory = async () => {
            await axios.get(`https://glowthinc.vercel.app/api/categories`)
                    .then(res => {
                        setCategory(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
        } 
        allCategory()
        if(id) {
            const currentProduct = async () => {
                await axios.get(`https://glowthinc.vercel.app/api/product/${id}`)
                        .then(res => {
                            setProduct(res.data)
                            setReady(true)
                        }).catch((err) => {
                            console.log(err)
                        })
            } 
            currentProduct()
        } else {
            setReady(true)
        }
    }, [id])
    

    const onFinish = async (values) => {
        setSpinButton(true)
        try {   
            let ekstensi = ["JPG", "JPEG", "PNG", "SVG", "TIFF", "WEBP"]
            let newUrl = new URL(values.image_url)  
            if(newUrl.protocol === "https:" || newUrl.protocol === "http:"){
                let newEkstensi = newUrl.href.split(".")
                newEkstensi = newEkstensi[newEkstensi.length-1].toUpperCase()
                let result = ekstensi.includes(newEkstensi)
                if(result){
                    if(!id){
                        await axios.post(`https://glowthinc.vercel.app/api/product`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                        .then((res) => {
                            setTrigger(true)
                            message.success('Data added successfully!')
                            navigate("/dashboard/product")
                        }).catch((err)=>{
                            console.log(err)
                        })
                    
                        } else {
                            await axios.put(`https://glowthinc.vercel.app/api/product/${id}`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                                .then((res) => {
                                    setTrigger(true)
                                    message.success('Data edited successfully!')
                                    navigate("/dashboard/product")
                                }).catch((err)=>{
                                    console.log(err)
                                })
                        }
                } else {
                    message.error('Please input valid image URL!')
                }
            } else {
                message.error('Please input valid image URL!')
            }
        } catch(err) {
            message.error('Please input valid image URL!')
          
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
        !ready ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
        <Form
        name="basic"
        labelCol={{
            span: 3
        }}
        labelAlign = "left"
        wrapperCol={{
            span: 12,
        }}
        initialValues={{
            nama: currentProduct.nama,
            harga: currentProduct.harga,
            deskripsi: currentProduct.deskripsi,
            stok: currentProduct.stok,
            category_id: currentProduct.category_id,
            image_url: currentProduct.image_url
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Name"
            name="nama"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Please input category name..." />
        </Form.Item>
        <Form.Item 
            label="Price"
            name="harga"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <InputNumber min={1} />
        </Form.Item>
        <Form.Item 
            label="Stock"
            name="stok"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <InputNumber min={1} />
        </Form.Item>
        <Form.Item 
            label="Image"
            name="image_url"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Please input category name..." />
        </Form.Item>
        <Form.Item 
            label="Description"
            name="deskripsi"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <TextArea rows={4} placeholder="Please input description..." showCount maxLength={1000}/>
        </Form.Item>
        <Form.Item 
            name="category_id" 
            label="Category" 
            rules={[
                    { 
                        required: true 
                    }
                ]}
        >
        <Select
          placeholder="Select category"
          allowClear
        >
            {
                category.map(e => {
                    return <Option value={e.id}>{e.name}</Option>
                })

            }
        </Select>
      </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 3,
                span: 12
              }
            }
        >
            <Button type="primary" style={{backgroundColor: "#70CACB", border: "none"}} htmlType="submit">
                Submit
                {spinButton ? <Spin indicator={antIcon}/> : ""}
            </Button>
        </Form.Item>
        </Form>
    )
}

export default FormProduct