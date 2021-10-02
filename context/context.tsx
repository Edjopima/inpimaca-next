import React, {createContext} from 'react';
import {inventoryReducer, cartReducer, userReducer, dolarReducer} from './reducers'

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

export type CartItemType = {
    product: ProductType,
    quantity: number,
}

export type DolarType = {
    name: string,
    value: number,
}

type initialStateType = {
  inventory: Array<ProductType>
  loggedInUser: userType | null
  shoppingCart: Array<CartItemType>
  dolarOptions: Array<DolarType>
}

const initialState: initialStateType = {
    inventory: [],
    loggedInUser: null,
    shoppingCart: [],
    dolarOptions: [],
}

const Context = createContext<{
        state:initialStateType
        dispatch: React.Dispatch<any>
    }>({
        state: initialState,
        dispatch: () => null,
    });

const mainReducer = ({inventory, shoppingCart, loggedInUser, dolarOptions}, action) => ({
    inventory: inventoryReducer(inventory, action),
    shoppingCart: cartReducer(shoppingCart, action),
    loggedInUser: userReducer(loggedInUser, action),
    dolarOptions:dolarReducer(dolarOptions, action)
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
