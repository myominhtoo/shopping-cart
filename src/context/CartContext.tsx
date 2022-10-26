import { createContext, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
    id : number,
    quantity : number
}

type CartContext = {
    openCart : () => void,
    closeCart : () => void,
    getItemQuantity : ( id : number ) => number,
    increaseCartQuantity : ( id : number ) => void,
    decreaseCartQuantity : ( id : number ) => void,
    removeFromCart : ( id : number ) => void,
    cartQuantity : () => number,
    cartItems : CartItem[]
}

const CartContext = createContext({} as CartContext );

export function useCartContext(){
    return useContext(CartContext);
}

type CartContextProviderProp = {
    children : React.ReactNode
}

export function CartContextProvider( { children } : CartContextProviderProp ){

    const  [ isOpen , setIsOpen  ] = useState(false);
    const [ cartItems , setCartItems ] = useLocalStorage<CartItem[]>( 'data' , [] );

    function openCart(){
        setIsOpen(true);
    }

    function closeCart(){
        setIsOpen(false);
    }

    function getItemQuantity( id : number ){
        return cartItems.find( item => item.id === id )?.quantity || 0;
    }

    function increaseCartQuantity( id : number ){
        setCartItems( prevCartItems => {
            if( prevCartItems.find( item => item.id === id) == null ){
                return [ ...prevCartItems , { id , quantity : 1 }];
            }else{
               return  prevCartItems.map( item => {
                    if(item.id === id ){
                        return { ...item , quantity : item.quantity + 1};
                    }else{
                        return item;
                    }
                })
            }

        })
    }

    function decreaseCartQuantity( id : number ){
        setCartItems( prevCartItems => {
            if( prevCartItems.find( item => item.id === id )?.quantity === 1 ){
                return prevCartItems.filter( item => item.id !== id );
            }else{
                return prevCartItems.map( item =>{
                    if( item.id == id ){
                        return { ...item ,quantity : item.quantity -1 }
                    }else{
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart( id : number ){
       setCartItems( prevCartItems => {
         return prevCartItems.filter( item => item .id !== id );
       })
    }

    function cartQuantity(){
        return cartItems.reduce( ( quantity , item ) => {
            return quantity + item.quantity
        } , 0 );
    }

    return (
        <CartContext.Provider 
         value={
            {
                openCart,
                closeCart,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                cartItems
            }
         }
        >
            {children}
        <ShoppingCart isOpen={isOpen} />
        </CartContext.Provider>
    )
}

