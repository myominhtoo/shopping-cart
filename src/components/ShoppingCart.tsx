import { Offcanvas, Stack } from "react-bootstrap"
import { useCartContext } from "../context/CartContext"
import formatCurrency from "../util/formatCurrency";
import { CartItem } from "./CartItem";
import items from '../data/items.json';

type ShoppingCartProp = {
    isOpen : boolean 
}

export function ShoppingCart( { isOpen } : ShoppingCartProp ){

    const { cartItems , closeCart } = useCartContext();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                  {cartItems.map( item => {
                    return (<CartItem key={item.id} {...item} />)
                  })}
                   <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                        const item = items.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )

}