import React, { useEffect, useState } from "react";


export function useLocalStorage<T>( key : string , initValue : T | (() => T) ){
    
    const [ value , setValue ] = useState<T>( () => {
        const storedValue = localStorage.getItem(key);
        
        if( storedValue !== null ) return JSON.parse(storedValue);

        if( typeof initValue === "function" ){
            return ( initValue as () => T )();
        }else{
            return initValue;
        }
    });

    useEffect(() => {
        localStorage.setItem( key , JSON.stringify(value));
    } , [ key , value ] );

    return [ value , setValue ] as [ typeof value , typeof setValue ];

}