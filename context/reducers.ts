export const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return action.payload;
    case 'ADD_INVENTORY_ITEM':
      return [...state, action.payload];
    case 'REMOVE_INVENTORY_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    case 'EDIT_INVENTORY_ITEM':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload
          };
        }
        return item;
      });
    default:
      return state;
  }
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      //check if item already exists in cart and update quantity
      const item = state.find(item => item.product.id === action.payload.id);
      if (item) {
        return state.map(item => {
          if (item.product.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
      }
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
}

export const dolarReducer = (state, action) => {    
  switch (action.type) {
    case 'SET_DOLAR':
      return action.payload;
    default:
      return state;
  }
}