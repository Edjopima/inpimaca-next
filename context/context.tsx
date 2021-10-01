import React, {createContext} from 'react';
import {inventoryReducer, cartReducer, userReducer} from './reducers'

export type ProductType = {
    id: number,
    product: string,
    price: number,
    category: string,
}
type userType = {
    id: number,
    name: string,
    userName: string,
}

type cartItemType = {
    product: ProductType,
    quantity: number,
}

type initialStateType = {
  inventory: Array<ProductType>
  loggedInUser: userType | null
  shoppingCart: Array<cartItemType>
}

const initialState: initialStateType = {
    inventory: [],
    loggedInUser: null,
    shoppingCart: [],
}

const Context = createContext<{
        state:initialStateType
        dispatch: React.Dispatch<any>
    }>({
        state: initialState,
        dispatch: () => null,
    });

const mainReducer = ({inventory, shoppingCart, loggedInUser}, action) => ({
    inventory: inventoryReducer(inventory, action),
    shoppingCart: cartReducer(shoppingCart, action),
    loggedInUser: userReducer(loggedInUser, action),
})

const ContextProvider: React.FC = ({children}) => {
    const [state, dispatch] = React.useReducer(mainReducer, initialState);
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}

export {Context, ContextProvider};
