import React,{useContext, useState} from 'react';
import { CartItemType, Context, ProductType } from '../../context/context';
import styles from './Modal.module.css'

type Prop = {
  onClose: () => void,
  product: ProductType
}

const ModalAddToCart:React.FC<Prop> = ({onClose, product}) => {
  const {state, dispatch} = useContext(Context);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (count <= 0) {
      setError('Inserte una Cantidad valida');
      return;
    }
    const item:CartItemType = {
      product: product,
      quantity: count
    }
    dispatch({type: 'ADD_ITEM', payload: item})
    onClose();
  }

  const addCount = () => {
    setCount(count + 1);
  }

  const removeCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  

  return (
    <div className={styles.editModal}>
      <h1>Agregar al Carrito</h1>
      {error&&<p className={styles.error}>{error}</p>}
      <p>{product.product}</p>
      <div className={styles.addToCart}>
        <p onClick={removeCount}>-</p>
        <input type="Number" placeholder='Cantidad' value={count} onChange={e=>setCount(parseFloat(e.target.value))} />
        <p onClick={addCount}>+</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} >Agregar</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalAddToCart;