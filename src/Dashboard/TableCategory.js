import { Table, Popconfirm, Button, message, Row, Col, Spin} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { UserContext } from "../Context/UserContext";

const TableCategory = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [triggerDelete, setTriggerDelete] = useState(false)
    const [user] = useContext(UserContext)
    const [spin, setSpin] = useState(true)
  
        useEffect(() => {
          const getCategory = async () => {
              await axios.get("https://glowthinc.vercel.app/api/categories")
                .then((res) => {
                  setCategory(res.data)
                  setSpin(false)
                }).catch((err)=>{
                  console.log(err)
                })
          } 
          getCategory()    
        }, [triggerDelete])


      const columns = [
        {
          title: "No",
          key: "no",
          render: (text) => {
              let index = category.indexOf(text)
              return (
                  <>{index+1}</>
              )
          }
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: "Action",
          key: "action",
          render: (record) => {
              const confirm = async (e) => {
                  await axios.delete(`https://glowthinc.vercel.app/api/categories/${record.id}`, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res) => {
                      setTriggerDelete(true)
                      message.success('Data has been deleted successfully')
                  })
                };

                setTriggerDelete(false)

              return (
                  <>
                      <EditOutlined onClick={() => {navigate(`/dashboard/edit-category/${record.id}`)}} style={{fontSize: "20px", marginRight: "10px", color: "#70CACB"}} />
                      <Popconfirm
                          title="Are you sure to delete this category?"
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
        navigate("/dashboard/add-category")
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
        <Button type="primary" icon={<PlusOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}} onClick={AddProduct}>Add Category</Button>
        <Table dataSource={category} columns={columns} />
      </div>
        
    )
}

export default TableCategory