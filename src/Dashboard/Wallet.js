import { Table, Row, Col, Spin, Button, Tabs, Modal, Form, Tag, InputNumber, Select, message} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VerticalAlignBottomOutlined, TagOutlined, LoadingOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const {Option} = Select

const Wallet = () => {
    // const navigate = useNavigate()
    const [key, setKey] = useState(1)
    const [wallet, setWallet] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [spinButton, setSpinButton] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triger, setTrigger] = useState(false)
    const [user] = useContext(UserContext)
    const [spin, setSpin] = useState(true)
  
        useEffect(() => {
          const getWallet = async () => {
              await axios.get("https://glowthinc.vercel.app/api/wallet", {headers: {"Authorization" : "Bearer "+ user.token}})
                .then((res) => {
                  setWallet(res.data)
                  setSpin(false)
                }).catch((err)=>{
                  console.log(err)
                })
          } 
          getWallet()    

          const getSaldo = async () => {
            await axios.get("https://glowthinc.vercel.app/api/saldo", {headers: {"Authorization" : "Bearer "+ user.token}})
              .then((res) => {
                setSaldo(res.data)
                // setSpin(false)
              }).catch((err)=>{
                console.log(err)
              })
            } 
            getSaldo() 
        }, [user.token, triger])

       
          let wallet1 = []
                   
          let wallet2 = []
          if(!spin){
            wallet.forEach(e => {
              if(e.res_midtrans !== "pembayaran"){
                const status = JSON.parse(e.res_midtrans)
                if(status.transaction_status === "settlement"){
                  wallet1.push(e)
              }
              } else {
                wallet1.push(e)
              }
            })

            wallet.forEach(e => {
              if(e.res_midtrans !== "pembayaran"){
                const status = JSON.parse(e.res_midtrans)
                if(status.transaction_status === "pending"){
                  wallet2.push(e)
                }
              }
             
            })
          }

          wallet1 = wallet1.sort(function(a, b){return b.id - a.id})
          wallet2 = wallet2.sort(function(a, b){return b.id - a.id})
      const columns = [
        {
          title: "No",
          key: "no",
          render: (text) => {
              let index = wallet1.indexOf(text)
              return (
                  <>{index+1}</>
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
            title: 'In',
            dataIndex: 'debit',
            key: 'in',
            render: (text) => {
              return (
                  <>{text > 0 ? new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(text) : "-"} </>
              )
            }
          },
          {
            title: 'Out',
            dataIndex: 'kredit',
            key: 'out',
            render: (text) => {
              return (
                  <>{text > 0 ? new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(text) : "-"}</>
              )
            }
          }
      ];


      const columns2 = [
        {
          title: "No",
          key: "no",
          render: (text) => {
              let index = wallet2.indexOf(text)
              return (
                  <>{index+1}</>
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
            title: 'Amount',
            dataIndex: 'debit',
            key: 'amount',
            render: (text) => {
              return (
                  <>{text > 0 ? new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(text) : ""} </>
              )
            }
          },
          {
            title: 'VA Number / Payment Code',
            dataIndex: 'res_midtrans',
            key: 'out',
            render: (text) => {
              text = JSON.parse(text)
              return (
                <>{text.payment_type === "bank_transfer" ? text.va_numbers[0].va_number + " (VA Number)" : text.payment_type === "cstore" ? text.payment_code + " (Payment Code)" : "-"}</>
              )
            }
          }
          ,
          {
            title: 'Payment',
            dataIndex: 'res_midtrans',
            key: 'out',
            render: (text) => {
              text = JSON.parse(text)           
              return (
                  <>{text.payment_type === "bank_transfer" ? text.va_numbers[0].bank.toUpperCase() : text.payment_type === "cstore" ? text.store.toUpperCase() : text.payment_type.toUpperCase()} {text.payment_type === "gopay" || text.payment_type === "shopeepay" ? <a rel="noreferrer" target="_blank" href={text.payment_type === "gopay" ? text.actions[1].url : text.payment_type === "shopeepay" ? text.actions[0].url : "http://localhost:3000/dashboard/wallet"}><Tag color="red">Pay Now</Tag></a> : ""} </>
              )
            }
          },
          {
            title: 'Expired In',
            dataIndex: 'createdAt',
            key: 'out',
            render: (text) => {
              function addHours(numOfHours, date = new Date()) {
                date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
              
                return date;
              }
              const date = new Date(text)

              const result = addHours(24, date).toLocaleString()
              return (
                  <>{result}</>
              )
            }
          }
          ,
          {
            title: 'Status',
            dataIndex: 'res_midtrans',
            key: 'status',
            render: (text) => {
              text = JSON.parse(text)
              return (
                  <>{text.transaction_status}</>
              )
            }
          }
      ];

      const onChange = (key) => {
        console.log(key);
      };

      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const onFinish = async (values) => {
          const orderId = values.bank + Date.now()
          setSpinButton(true)
          let newValues = ""
          if(values.bank === "gopay"){
            newValues = {
                payment_type: "gopay",
                "transaction_details": {
                  order_id: orderId,
                  gross_amount: values.amount
                },
                item_details: [
                  {
                    id: orderId,
                    price: values.amount,
                    quantity: 1,
                    name: "Top Up E-Wallet"
                  }
                ],
                customer_details: {
                  first_name: "Customer",
                  last_name: "Glow Thinc",
                  email: `${user.email}`,
                  phone: "-"
                },
                gopay: {
                  enable_callback: true,
                  callback_url: "http://localhost:3000/dashboard/wallet"
                },
                    custom_expiry: {
                    expiry_duration: 1,
                    unit: "day"
                },
                "kredit": 0,
                "debit": values.amount,
                "payment_id": orderId
            }
          } else if (values.bank === "shopeepay"){
            newValues = {
              payment_type: "shopeepay",
              "transaction_details": {
                order_id: orderId,
                gross_amount: values.amount
              },
              item_details: [
                {
                  id: orderId,
                  price: values.amount,
                  quantity: 1,
                  name: "Top Up E-Wallet"
                }
              ],
              customer_details: {
                first_name: "Customer",
                last_name: "Glow Thinc",
                email: `${user.email}`,
                phone: "-"
              },
                shopeepay: {
                  callback_url: "http://localhost:3000/dashboard/wallet"
              },
                  custom_expiry: {
                  expiry_duration: 1,
                  unit: "day"
              },
              "kredit": 0,
              "debit": values.amount,
              "payment_id": orderId
          }
          } else if(values.bank === "indomaret" || values.bank === "alfamart"){
            newValues = {
              payment_type: "cstore",
              "transaction_details": {
                order_id: orderId,
                gross_amount: values.amount
              },
              cstore: {
                store: `${values.bank}`,
                message: "Top Up E-Wallet"
              },
              item_details: [
                {
                  id: orderId,
                  price: values.amount,
                  quantity: 1,
                  name: "Top Up E-Wallet"
                }
              ],
              customer_details: {
                first_name: "Customer",
                last_name: "Glow Thinc",
                email: `${user.email}`,
                phone: "018959106630"
              },
              custom_expiry: {
                  expiry_duration: 1,
                  unit: "day"
              },
              "kredit": 0,
              "debit": values.amount,
              "payment_id": orderId
            }
          } else {
            newValues = {
                payment_type: "bank_transfer",
                bank_transfer: {
                bank: values.bank
              },
              "transaction_details": {
                order_id: orderId,
                gross_amount: values.amount
              },
                  custom_expiry: {
                  expiry_duration: 1,
                  unit: "day"
              },
              "kredit": 0,
              "debit": values.amount,
              "payment_id": orderId
            }
          }
          

          await axios.post(`https://glowthinc.vercel.app/api/charge`, newValues, {headers: {"Authorization" : "Bearer "+ user.token}})
                  .then((res) => {
                    setSpinButton(false)
                      message.success('Top Up successfully!')
                      setKey(2)
                      setIsModalOpen(false);
                      if(triger){
                        setTrigger(false)
                      } else {
                        setTrigger(true)
                      }
                      
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
      spin ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
      <div className="dashboard-content">
        <Button type="primary" icon={<TagOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none"}}>Saldo: {new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(saldo)}</Button>
        
        <Tabs
          defaultActiveKey={key}
          type="card"
          onChange={onChange}
          items={[
            {
              label: `History`,
              key: '1',
              children: (
                <Table dataSource={wallet1} columns={columns} />
              ),
            },
            {
              label: `Top Up`,
              key: '2',
              children: (
                <>
                  <Button type="primary" icon={<VerticalAlignBottomOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#70CACB", border: "none", marginLeft: "20px", float: "right"}} onClick={showModal}>Top Up</Button>
                  <Table dataSource={wallet2} columns={columns2} />
                </>
                
              ),
            }
          ]}
        />

        <Modal title="" open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          initialValues={{
              amount: 50000,
              bank: "bni"
          }}
          labelCol={{
            span: 6
          }}
         labelAlign="left"
          wrapperCol={{
              span: 18,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          >
          <Form.Item 
                label="Payment"
                name="bank"
                rules={[
                    {
                        required: true,
                    }
                ]}
            >
                <Select style={{ width: 120 }}>
                    <Option value="bca">BCA</Option>
                    <Option value="bni">BNI</Option>
                    <Option value="bri">BRI</Option>
                    <Option value="gopay">GoPay</Option>
                    <Option value="shopeepay">ShopeePay</Option>
                    <Option value="indomaret">Indomaret</Option>
                    <Option value="alfamart">Alfamart</Option>
                </Select>
            </Form.Item>

          <Form.Item 
              label="Amount"
              name="amount"
              rules={[
                  {
                      required: true,
                  }
              ]}
          >
              <InputNumber min={50000} placeholder="..." />
          </Form.Item>                 
          <Form.Item 
              wrapperCol = { {
                  offset: 6,
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
        </Modal>
      </div>
        
    )
}

export default Wallet