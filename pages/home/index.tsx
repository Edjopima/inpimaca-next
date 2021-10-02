import React,{useContext, useEffect} from 'react';
import styles from './Home.module.css'
import fetch from 'isomorphic-unfetch'
import { Context, DolarType } from '../../context/context';
import { ProductType } from '../../context/context';
import { NextPage } from 'next';
import Modal from '../../components/Modal/Modal';
import Pencil from '../../public/images/pencil-ruler-solid.svg'
import Trash from '../../public/images/trash-solid.svg'
import Cart from '../../public/images/shopping-cart.svg'

export const getServerSideProps = async () => {
  const res = await fetch('https://inpimaca-api.herokuapp.com/inventario')
  const inventory = await res.json()
  const res2 = await fetch('https://s3.amazonaws.com/dolartoday/data.json')
  const dolarData = await res2.json()
  const dolarToday = dolarData.USD.dolartoday
  return {
    props: {
      inventory,
      dolarToday
    }
  }
}

type Props = {
  inventory: ProductType[]
  dolarToday: number
}

const Home:NextPage<Props> = ({inventory, dolarToday}) => {
  const {state,dispatch} = useContext(Context)
  const dolarChange = dolarToday + 0.1
  const [selectedProduct, setSelectedProduct] = React.useState<ProductType | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [modalType, setModalType] = React.useState("edit")

  useEffect(() => {
    const dolarOptions:Array<DolarType> = [{
      name: "Dolar Today",
      value: dolarToday,
    },{
      name: "Dolar Compra",
      value: dolarChange,
    }] 
    dispatch({type:'SET_INVENTORY',payload:inventory})
    dispatch({type:'SET_DOLAR',payload:dolarOptions})
  },[inventory, dolarToday])

  const openModal = (product:ProductType, type:string) => {
    setSelectedProduct(product)
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setModalOpen(false)
  }

  return (
    <div className={styles.inventory}>
      <h1>Lista de Precios</h1>
      <div className={styles.dolarMonitor}>
        <p>Dolar Today: {dolarToday}</p>
        <p>Dolar Compra: {dolarChange.toFixed(2)}</p>
      </div>
      <div className={styles.inventoryHeader}>
          <p>Producto</p>
          <p>Precio USD</p>
          <p>Precio Bs</p>
          <p>Acciones</p>
        </div>
      <div className={styles.inventoryTable}>
        {state.inventory.map(item => (
          <div
            className={styles.inventoryItem} 
            key={item.id}
          >
            <p>{item.product}</p>
            <p>{item.price}</p>
            <p>{(item.price * dolarChange).toFixed(2)}</p>
            <div className={styles.iconContainer}>
              <Cart className={styles.icon} onClick={() => openModal(item,'addToCart')}/>
              <Pencil className={styles.icon} onClick={() => openModal(item,'edit')}/>
              <Trash className={styles.icon} onClick={() => openModal(item,'remove')}/>
            </div>
          </div>
        ))}
    </div>
      <Modal
        product={selectedProduct}
        show={modalOpen}
        type={modalType}
        onClose={closeModal}
      />
  </div>
  );
}

export default Home;