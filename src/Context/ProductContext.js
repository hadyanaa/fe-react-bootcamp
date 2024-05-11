import React, { useState, createContext } from "react";
import axios from "axios"
import { useEffect } from "react"

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false)

    useEffect( () => {
        const product = async () => {
            setLoading(true)
            setTrigger(false)
            const result = await axios.get("https://glowthinc.vercel.app/api/product")
            .then((res)=>{
                return res.data
            })
            .catch((err)=>{
                console.log(err)
            })
            setProducts(result)
            setLoading(false)
        }
        product()
    }, [trigger])
    
    return (
        <ProductContext.Provider value={[products, setProducts, loading, setLoading, trigger, setTrigger]}>
            {props.children}
        </ProductContext.Provider>
    )
}