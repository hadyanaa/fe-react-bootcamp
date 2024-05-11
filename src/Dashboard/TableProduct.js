import { Table, message, Popconfirm, Image, Button, Row, Col, Spin} from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ProductContext } from "../Context/ProductContext";


const TableProduct = () => {
  const [user] = useContext(UserContext)
  const [dataSource,,loading,,, setTrigger] = useContext(ProductContext)

  const navigate = useNavigate()
      const columns = [
        {
          title: "No",
          key: "no",
          render: (text) => {
              let index = dataSource.indexOf(text)
              return (
                  <>{index+1}</>
              )
          }
        },
        {
          title: 'Image',
          dataIndex: 'image_url',
          key: 'image',
          render: (record) => {
            return(
              <Image width={70} src={record} alt="image"></Image>
            )
          }
        },
        {
          title: 'Name',
          dataIndex: 'nama',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'harga',
          key: 'price',
          render : (text) => {
            return (
              <>
                {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(text)}
              </>
            )
          }
        },
        {
          title: 'Stock',
          dataIndex: 'stok',
          key: 'stock',
        },
        {
          title: "Action",
          key: "action",
          fixed: "right",
          render: (record) => {
              const confirm = async (e) => {
                  await axios.delete(`https://glowthinc.vercel.app/api/product/${record.id}`, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res) => {
                      setTrigger(true)
                      message.success('Data has been deleted successfully')
                  })
                };


              return (
                  <>
                      <EditOutlined onClick={() => {navigate(`/dashboard/edit-product/${record.id}`)}} style={{fontSize: "20px", marginRight: "10px", color: "#70CACB"}} />
                      <Popconfirm
                          title="Are you sure to delete this product?"
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                      >
                          <DeleteOutlined style={{fontSize: "20px", marginRight: "10px", color: "red"}} />
                      </Popconfirm>
                      
                  </>
              )
          }
        }

      ];

      const AddProduct = () => {
        navigate("/dashboard/add-product")
      }

    return (
      loading ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
      <div className="dashboard-content">
        <Button type="primary" icon={<PlusOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={AddProduct}>Add Product</Button>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }} />
      </div>
        
    )
}

export default TableProduct