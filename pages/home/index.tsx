import React,{useContext, useEffect} from 'react';
import styles from './Home.module.css'
import fetch from 'isomorphic-unfetch'
import { Context } from '../../context/context';
import { ProductType } from '../../context/context';
import { NextPage } from 'next';

export const getServerSideProps = async () => {
  const res = await fetch('https://inpimaca-api.herokuapp.com/inventario')
  const inventory = await res.json()
  return {
    props: {
      inventory
    }
  }
}

type Props = {
  inventory: ProductType[]
}

const Home:NextPage<Props> = ({inventory}) => {
  const {state,dispatch} = useContext(Context)

  useEffect(() => {
    dispatch({type:'SET_INVENTORY',payload:inventory})
  },[inventory])

  return (
    <div className={styles.inventory}>
      <h1>Lista de Precios</h1>
      <div>
        <p>Dolar Today: 5.00</p>
        <p>Dolar Compra: 5.10</p>
      </div>

      <div>
        {state.inventory.map(item => (
          <div 
          onClick={() => dispatch({type: 'ADD_ITEM', payload: item})}
          key={item.id}>
            <p>{item.product}</p>
            <p>{item.price}</p>
          </div>
        ))}
    </div>
  </div>
  );
}

export default Home;