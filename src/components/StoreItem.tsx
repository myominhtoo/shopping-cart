import formatCurrency from '../util/formatCurrency';
import { Button, Card } from 'react-bootstrap';
import { useCartContext } from '../context/CartContext';

type StoreItemProps = {
    id : number,
    name : string,
    price : number,
    imageUrl : string
}

export function StoreItem( { id , name , price , imageUrl } : StoreItemProps ){

    const { getItemQuantity , increaseCartQuantity , decreaseCartQuantity } = useCartContext();
    const itemQuantity = getItemQuantity( id );

    return (
            <Card className='h-100 w-50 mx-auto my-3'>
                <Card.Img
                    variant='top'
                    src={imageUrl}
                    height="300px"
                />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                        <span className='fs-2'>{name}</span>
                        <span className='text-muted mx-2'>{formatCurrency(price)}</span>
                    </Card.Title>
                    {
                       itemQuantity > 0 
                       ? (
                            <div className='d-flex justify-content-center gap-2 align-items-center'>
                                <Button variant='primary' onClick={() => decreaseCartQuantity(id) }>-</Button>
                                <span className='h3 text-muted'>{ itemQuantity }</span>
                                <Button variant='primary' onClick={ () => increaseCartQuantity(id) }>+</Button>
                            </div>
                          )
                        : (
                            <Button onClick={() => increaseCartQuantity(id) }>Add To Cart</Button>
                          )  
                    }
                </Card.Body>
            </Card>
    )
}