import { Button, Stack } from "react-bootstrap"
import { useCartContext } from "../context/CartContext"
import formatCurrency from "../util/formatCurrency"
import items from '../data/items.json';

type CartItemProp = {
    id : number,
    quantity : number,
}

export function CartItem( { id , quantity } : CartItemProp ){

    const { removeFromCart } = useCartContext();
    const item = items.find( item => item.id == id );

    if ( item == null ) return null;
 
    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imageUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
    )
}