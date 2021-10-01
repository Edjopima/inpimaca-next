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
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
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
