import React, { useState, createContext, useContext } from "react";
import axios from "axios"
import { useEffect } from "react"
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = (props) => {
    const [user] = useContext(UserContext)
    const tokenOrder = user ? user.token : null ;
    const [userOrder, setUserOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false)

    useEffect( () => {
        const order = async () => {
            setLoading(true)
            setTrigger(false)
            const result = await axios.get("https://glowthinc.vercel.app/api/order/cart", {headers: {"Authorization" : "Bearer "+ tokenOrder}})
            .then((res)=>{
                return res.data
            })
            .catch((err)=>{
                console.log(err)
            })
            setUserOrder(result)
            setLoading(false)
        }
        order()
    }, [trigger, tokenOrder])
    
    return (
        <OrderContext.Provider value={[userOrder, setUserOrder, loading, setLoading, trigger, setTrigger]}>
            {props.children}
        </OrderContext.Provider>
    )
}