import { Table, Row, Col, Spin,Tabs, Popover, Tag, Button, Timeline, message, Popconfirm} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { UserContext } from "../Context/UserContext";
import { ProductContext } from "../Context/ProductContext";

const OrderAdmin = () => {
    // const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [user] = useContext(UserContext)
    const [spin, setSpin] = useState(true)
    const [product] = useContext(ProductContext)
    const [trigger, setTrigger] = useState(false)
    const [page, setPage] = useState(1)
  
        useEffect(() => {
          const getOrders = async () => {
              await axios.get("https://glowthinc.vercel.app/api/orders", {headers: {"Authorization" : "Bearer "+ user.token}})
                .then((res) => {
                  setOrders(res.data)
                  setSpin(false)
                }).catch((err)=>{
                  console.log(err)
                })
          } 
          getOrders()    

        }, [user.token, trigger])

          let ordersDone = []
                   
          let ordersWaitingForDelivery = []

          let ordersInDelivery = []

          if(!spin){
            orders.forEach(e => {
              const history = e.histories.sort((a, b) => {return b.id - a.id})
              if(history.length > 0 ){
                    if(history[0].status === "Transaksi berhasil"){
                        ordersDone.push(e)
                    } else if (history[0].status === "Pembayaran berhasil"){
                        ordersWaitingForDelivery.push(e)
                    } else if (history[0].status === "Barang sedang dikirim"){
                        ordersInDelivery.push(e)
                    }
                }
            })

            
          }

      const columns = [
        {
          title: "No",
          key: "no",
          render: (value, items, index) => {
              return (
                  <>{(page - 1) * 10 + index + 1}</>
              )
          }
        },
        {
          title: 'Date',
          dataIndex: 'updatedAt',
          key: 'date',
          render: (text) => {
            let newDate = new Date(text).toLocaleDateString()

            return (
                <>{newDate}</>
            )
          }
        },
        {
            title: 'Status',
            datStatusdex: 'histories',
            key: 'status',
            render: (text) => {
              const history = text.histories.sort((a, b) => {return b.id-a.id})
              const content = (
                <div>
                  <Timeline mode="left" style={{minHeight: "200px", width: "400px", marginTop: "30px"}}>
                        {
                          history.map(e => {
                            let newDate = new Date(e.createdAt).toLocaleString()
                            let color = "gray"
                            if(e.is_active){
                              color = "green"
                            }
                            return(
                              <Timeline.Item color={color} label={newDate}>{e.status}</Timeline.Item>
                            )
                          })
                        }
                        
                      </Timeline> 
                </div>
              );

              return (
                  <>
                    {
                      history.length > 0 ? history[0].status === "Pembayaran berhasil" ? 
                      <Tag icon={<CheckCircleOutlined />} color="warning">
                        {history.length > 0 ? history[0].status : ""}
                      </Tag> :
                      history[0].status === "Barang sedang dikirim" ?
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        {history.length > 0 ? history[0].status : ""}
                      </Tag> : 
                      history[0].status === "Menunggu pembayaran" ?
                      <Tag icon={<ClockCircleOutlined />} color="error">
                        {history.length > 0 ? history[0].status : ""}
                      </Tag> :
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        {history.length > 0 ? history[0].status : ""}
                      </Tag>
                      : ""
                    }
                    <Popover content={content} title="">
                      <Button type="link" style={{padding: "0px"}}>transaction details</Button>
                    </Popover>
                    
                  </>
              )
            }
          },
          {
            title: 'Amount',
            dataIndex: 'orderItems',
            key: 'amount',
            render: (text) => {
                let amount = 0
                product.forEach(e => {
                    text.forEach(el => {
                        if(e.id === el.productId){
                            amount += (e.harga * el.quantity)
                        }
                    });
                })

            return (
                <>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(amount)}</>
              )
            }
          },
          {
            title: 'Items',
            dataIndex: 'orderItems',
            key: 'items',
            render: (text) => {
                let newProduct = []
                product.forEach(e => {
                    text.forEach(el => {
                        if(e.id === el.productId){
                            newProduct.push(e)
                        }
                    });
                })

            return (
                <>{
                    newProduct.map((e, i) => {
                        return (
                            <>
                                <Row align="middle">
                                    <p>{(i+1) + ". " + e.nama + " qty: " + text[i].quantity}</p>
                                </Row>
                            </>
                        )
                    })
                }</>
              )
            }
          },
          {
            title: "Action",
            fixed: "right",
            key: "action",
            render: (record) => {
                const confirm = async (e) => {
                  await axios.post(`https://glowthinc.vercel.app/api/transaction-end/${record.id}`, {},{headers: {"Authorization" : "Bearer "+ user.token}}).then((res) => {
                      setTrigger(true)
                      message.success('Set delivery successful!')
                  })
                };

                setTrigger(false)
               
                const history = record.histories.sort((a,b) => {return b.id- a.id})
                let button = false
                let color = "#70CACB"
                if(history.length > 0){
                    if(history[0].status !== "Pembayaran berhasil"){
                        button = true
                        color = '#70CACB'
                      }
                }

               
                return (
                    <>
                        <Popconfirm
                            title="Pastikan barang sudah dikemas dengan rapi!"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                            disabled={button}
                        >
                            <Button disabled={button} type='danger' style={{fontSize: "14px", backgroundColor: color, border: "none", color: "white"}} >Arrange Delivery</Button>
                        </Popconfirm>
                        
                    </>
                )
            }
        }
      ];

      const onChange = (key) => {
      };

    return (
      spin ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
      <div className="dashboard-content">
        <Tabs
          defaultActiveKey={1}
          type="card"
          onChange={onChange}
          items={[
            {
              label: `All Orders`,
              key: '1',
              children: (
                <Table dataSource={orders} pagination={{onChange(current) {setPage(current)}}} columns={columns} scroll={{ x: 1300 }}/>
              ),
            },
            {
              label: `Waiting To Be Processed`,
              key: '3',
              children: (
                <Table dataSource={ordersWaitingForDelivery} pagination={{onChange(current) {setPage(current)}}} columns={columns} scroll={{ x: 1300 }}/>
              ),
            },
            {
              label: `In Delivery`,
              key: '4',
              children: (
                <Table dataSource={ordersInDelivery} pagination={{onChange(current) {setPage(current)}}} columns={columns} scroll={{ x: 1300 }}/>
              ),
            },
            {
              label: `Done`,
              key: '2',
              children: (
                <Table dataSource={ordersDone} pagination={{onChange(current) {setPage(current)}}} columns={columns} scroll={{ x: 1300 }}/>
              ),
            }
          ]}
        />
        </div>
        
    )
}

export default OrderAdmin