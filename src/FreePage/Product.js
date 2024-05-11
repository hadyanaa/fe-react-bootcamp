import { Card, Checkbox, Col, Image, List, Row, Select, Spin, Input, Skeleton} from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../Context/ProductContext"
import BannerProduct from '../Image/ourproduct.jpg'

const { Search } = Input

const ListProduct = () => {
    const [products, setProducts, loading,, trigger, setTrigger] = useContext(ProductContext)
    const [category, setCategory] = useState({})
    const [filteredProduct, setFilteredProduct] = useState(products)
    const [sort, setSort] = useState("SORT PRICE")
    const [loadCategory, setLoadCategory] = useState(true)
    
    useEffect(()=>{
        setFilteredProduct(products)
        const fetchData = async () => {
            let result = await axios.get(`https://glowthinc.vercel.app/api/categories`)
            let dataCategories = result.data
            setCategory(dataCategories)
            setLoadCategory(false)
        }
        fetchData()
    }, [products])
    
    const onChange = checkedValues => {
        setSort("SORT PRICE")
        if (checkedValues.length === 0){
            setFilteredProduct(products)
        } else {
            const resultProduct = products.filter(function(item){
                return checkedValues.includes(String(item.categoryProduct.name).toUpperCase())
            })
            setFilteredProduct(resultProduct)
        }
    }

    const categories = []
    
    category.length > 0 ? category.map(function(item){
        return categories?.push(String(item.name).toUpperCase())
    }) : console.log(0)

    const handleChange = (value) => {
        setSort(value)
        if(value !== 0){           
            if(filteredProduct.length === 0){
                console.log(value)
                if(value === "lowtohigh"){
                    const newProducts = products.sort(function(a,b){return a.harga - b.harga})
                    setProducts(newProducts)
                } else if(value === "hightolow"){
                    const newProducts = products.sort(function(a,b){return b.harga - a.harga})
                    setProducts(newProducts)
                } else{
                    if(trigger){
                        setTrigger(false)
                    } else {
                        setTrigger(true)
                    }
                }
             } else {
                if(value === "lowtohigh"){
                    const newProducts = filteredProduct.sort(function(a,b){return a.harga - b.harga})
                    setFilteredProduct(newProducts)
                } else if(value === "hightolow"){
                    const newProducts = filteredProduct.sort(function(a,b){return b.harga - a.harga})
                    setFilteredProduct(newProducts)
                } else{
                    if(trigger){
                        setTrigger(false)
                    } else {
                        setTrigger(true)
                    }
                }
             } 
        }
    };

    const onSearch = (value) => {
        let searchProduct = []
        if(value.length <= 0){
            if(trigger){
                setTrigger(false)
            } else {
                setTrigger(true)
            }
        }
        
            filteredProduct.forEach(e => {
                let productName = e.nama.toUpperCase()
                let text = value.toUpperCase()
                let checkText = productName.indexOf(text)
                
                if(checkText >= 0 ){
                     searchProduct.push(e)
                }
             })
        
        setFilteredProduct(searchProduct)
    }

    const onChange1 = (value) => {
        let searchProduct = []
        if(value.target.value.length <= 0){
            if(trigger){
                setTrigger(false)
            } else {
                setTrigger(true)
            }
        } else {
            
        }
        
        filteredProduct.forEach(e => {
            let productName = e.nama.toUpperCase()
            let text = value.target.value.toUpperCase()
            let checkText = productName.indexOf(text)
            
            if(checkText >= 0 ){
                 searchProduct.push(e)
            }
         })    
        
        setFilteredProduct(searchProduct)
    }

    return (
        <div className="container">
        <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 className="caption">OUR PRODUCT</h1>
        </div>
        {loading ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px", marginBottom: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :

        <div className="content">
            <Row>
                <Col span={24} className="products">
                    {loadCategory ? <Skeleton.Input active/> : <Checkbox.Group className="checkboxCategory" options={categories} onChange={onChange}/> }
                    
                    <Search
                        placeholder="Please input product name"
                        allowClear
                        size="middle"
                        onSearch={onSearch}
                        onChange={onChange1}
                        style={{
                            width: 300,
                            marginLeft: "100px",
                            border: "2px solid #006F79",
                          }}
                    />
                    <Select
                        value={sort}
                        placeholder="SORT PRICE"
                        size="middle"
                        style={{
                            width: 200,
                            float: "right"
                        }}
                        onChange={handleChange}
                        options={[
                            {
                            value: 'lowtohigh',
                            label: 'Low to High',
                            },
                            {
                            value: 'hightolow',
                            label: 'High to Low',
                            }
                        ]}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <List
                        style={{marginTop: "20px"}}
                        pagination={{pageSize: 12}}
                        grid={{column:4, gutter:24}}
                        dataSource={filteredProduct}
                        renderItem={el=>(
                            <List.Item>
                                <div className="card">
                                    <Card key={el.id}
                                    cover={<img src={el.image_url} alt={el.nama}></img>}>
                                        <h1 
                                        style={{whiteSpace: "pre-wrap", overflow: "hidden", 
                                            textOverflow: "ellipsis", wordBreak:"keep-all",
                                            display: "-webkit-box", WebkitLineClamp: "2", 
                                            WebkitBoxOrient: "vertical", margin: "10px 0px 10px 0px"}}>
                                            {el.nama}
                                        </h1>
                                        <h1 style={{fontWeight: "700"}}>{new Intl.NumberFormat("id-ID", {style:"currency", currency: "IDR"}).format(el.harga)}</h1>
                                        <h1><a style={{color: "#48ADAF"}} href={`/product/detail/${el.id}`}>View More</a></h1>
                                    </Card>
                                </div>

                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>}
        </div>
        
    )
}

export default ListProduct;