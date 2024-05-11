import { Route, Routes} from "react-router-dom"
import Dashboard from "../Dashboard"
import FormProduct from "../Dashboard/FormProduct"
import TableProduct from "../Dashboard/TableProduct"
import About from "../FreePage/About"
import Contact from "../FreePage/Contact"
import Home from "../FreePage/Home"
import ListProduct from "../FreePage/Product"
import TableCategory from "../Dashboard/TableCategory"
import FormCategory from "../Dashboard/FormCategory"
import Profile from "../Dashboard/Profile"
import ChangePassword from "../Dashboard/ChangePassword"
import DetailProduct from "../FreePage/ProductDetail"
import FormProfile from "../Dashboard/FormProfile"
import Transaction from "../FreePage/Transaction"
import Cart from "../FreePage/Cart"
import Order from "../FreePage/Order"
import Wallet from "../Dashboard/Wallet"
import OrderUser from "../Dashboard/TableOrderUser"
import OrderAdmin from "../Dashboard/TableOrderAdmin"

const LoginRoute = () => {
    return(
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/product" element={<ListProduct/>} />
            <Route path="/product/detail/:id" element={<DetailProduct/>} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/product" element={<TableProduct/>}/>
            <Route path="/dashboard/add-product" element={<FormProduct/>}/>
            <Route path="/dashboard/edit-product/:id" element={<FormProduct/>}/>
            <Route path="/dashboard/category" element={<TableCategory/>}/>
            <Route path="/dashboard/add-category" element={<FormCategory/>}/>
            <Route path="/dashboard/edit-category/:id" element={<FormCategory/>}/>
            <Route path="/dashboard/profile" element={<Profile/>}/>
            <Route path="/dashboard/edit-profile" element={<FormProfile/>}/>
            <Route path="/dashboard/change-password" element={<ChangePassword/>}/>
            <Route path="/transaction" element={<Transaction/>}/>
            <Route path="/dashboard/wallet" element={<Wallet/>}/>
            <Route path="/dashboard/order/user" element={<OrderUser/>}/>
            <Route path="/dashboard/order" element={<OrderAdmin/>}/>
        </Routes>
    )
}

export default LoginRoute