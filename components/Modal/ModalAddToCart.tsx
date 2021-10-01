import React,{useContext, useState} from 'react';
import { CartItemType, Context, ProductType } from '../../context/context';
import styles from './Modal.module.css'

type Prop = {
  onClose: () => void,
  product: ProductType
}

const ModalAddToCart = ({onClose, product}) => {
  const {state, dispatch} = useContext(Context);
  const [count, setCount] = useState(0);

  const handleSubmit = () => {
    const item:CartItemType = {
      product: product,
      quantity: count
    }
    dispatch({type: 'ADD_ITEM', payload: item})
  }
  

  return (
    <div className={styles.editModal}>
      <h1>Agregar al Carrito</h1>
      <p>{product.product}</p>
      <div className={styles.addToCart}>
        <p>-</p>
        <input type="Number" placeholder='Cantidad' value='count' onChange={e=>setCount(parseFloat(e.target.value))} />
        <p>+</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} >Agregar</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalAddToCart;