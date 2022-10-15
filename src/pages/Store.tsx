import {StoreItem} from '../components/StoreItem';
import items from '../data/items.json';

export function Store(){

    document.title = "Store";

    return (
          <>
           {items.map( item => {
             return (
                <StoreItem key={item.id} {...item} />
             )
           })}
          </>
    )
}