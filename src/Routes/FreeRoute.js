import { Route, Routes} from "react-router-dom"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import About from "../FreePage/About"
import Cart from "../FreePage/Cart"
import Contact from "../FreePage/Contact"
import Home from "../FreePage/Home"
import Order from "../FreePage/Order"
import ListProduct from "../FreePage/Product"
import DetailProduct from "../FreePage/ProductDetail"

const FreeRoute = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product" element={<ListProduct/>} />
            <Route path="/product/detail/:id" element={<DetailProduct/>} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Login/>}/>
        </Routes>
    )
}

export default FreeRoute