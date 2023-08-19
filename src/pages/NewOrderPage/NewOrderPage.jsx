import {useState, useEffect, useRef} from "react";
import * as itemsAPI from "../../utilities/items-api";
import * as ordersAPI from "../../utilities/orders-api";

import './NewOrderPage.css';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [activeCat, setActiveCat] = useState("");
    const [cart, setCart] = useState(null);
    const categories = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getItems() {
            const items = await itemsAPI.getAll();
            categories.current = items.reduce((accum, item) => {
                if (!accum.includes(item.category.name))
                    accum.push(item.category.name);
                return accum;
            }, []);
            setMenuItems(items);
        }

        async function getCart() {
            const cart = await ordersAPI.getCart();
            setCart(cart);
        }

        getItems();
        getCart();
    }, []);

    async function addToOrder(itemId) {
        const cart = await ordersAPI.addToCart(itemId);
        setCart(cart);
    }


    async function changeQty(itemId, qty) {
        const cart = await ordersAPI.setItemQtyInCart(itemId, qty);
        setCart(cart);
    }

    async function handleCheckout() {
        await ordersAPI.checkout();
        navigate("/orders");
    }


    return (
        <main className="NewOrderPage">
            <aside>
                <Logo />
                <CategoryList
                    categories={categories.current}
                    activeCat={activeCat}
                    setActiveCat={setActiveCat}
                />
                <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
                <UserLogOut />
            </aside>
            <MenuList
                menuItems={menuItems.filter(item => item.category.name === activeCat)}
                addToOrder={addToOrder}
            />
            <OrderDetail order={cart} changeQty={changeQty} handleCheckout={handleCheckout}/>
        </main>


    );
}