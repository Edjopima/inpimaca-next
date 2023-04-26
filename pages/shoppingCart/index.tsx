import React,{useContext} from 'react';
import styles from '..//Home.module.css'
import { Context } from '../../context/context';
import Trash from '../../public/images/trash-solid.svg'

const index = () => {
  const {state:{shoppingCart, dolarOptions },dispatch} = useContext(Context);  
  const total = shoppingCart.reduce((acc,item) => acc + item.quantity * item.product.price,0)
  

  const calculateTotal = (base: any) => {
    let dolar = 0
    if (dolarOptions.length>2) {
      dolar = dolarOptions[2].value
      return base * dolar
    }

    if (dolarOptions.length>0) {
      dolar = dolarOptions[1]?.value
      return base * dolar
    }

    return base * dolar
  }

  const totalBs = calculateTotal(total)

  const remove = (id:number) => {
    dispatch({type:'REMOVE_FROM_CART',payload:id})
  }

  const clear = () => {
    dispatch({type:'CLEAR_CART'})
  }

  return (
    <div className={styles.inventory}>
      <h1>Shopping Cart</h1>
      <br/>
      <div className={styles.inventoryHeader}>
        <p>Producto</p>
        <p>Precio Unitario</p>
        <p>Unidades</p>
        <p>Total</p>
      </div>
      <div className={styles.shoppingCartTable}>
        {shoppingCart.map(item => (
          <div className={styles.inventoryItem} key={item.product.id}>
            <p>{item.product.product}</p>
            <p>{item.product.price}</p>
            <p>{item.quantity}</p>
            <p>{item.quantity * item.product.price}</p>
            <Trash onClick={()=>remove(item.product.id)}className={styles.icon}/>
          </div>
        ))}
      </div>
      <div className={styles.shoppingCartTotal}>
        <div className={styles.totalContainer}>
          <p>Total USD: {total}</p>
          <p>Total BS: {totalBs.toFixed(2)}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button >Comprar</button>
          <button className={styles.cancel} onClick={clear}>Limpiar Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default index;