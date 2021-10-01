import React,{useState} from 'react';
import { ProductType } from '../../context/context';
import styles from './Modal.module.css';

type Props = {
  onClose: () => void;
  product?: ProductType
  type: string
}

const ModalEdit:React.FC<Props> = ({type, product, onClose, }) => {
  const [name, setName] = useState(product?.product);
  const [price, setPrice] = useState(product?.price);
  const [category, setCategory] = useState(product?.category);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if(type === 'edit'){
      const data = {
        id: product.id,
        product: name,
        price: price,
        category: category
      }
      const url = 'https://inpimaca-api.herokuapp.com/actualizarProducto'
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await res.json()
        if(json.status === 'success'){
          onClose()
        }else{
          setError('Error al Editar Producto')
        }
      } catch (error) {
        setError('Error al Editar Producto')
      }
    } else {
      const data = {
        product: name,
        price: price,
        category: category
      }
      const url = 'https://inpimaca-api.herokuapp.com/agregarProducto'
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await res.json()
        if(json.status === 'success'){
          onClose()
        }else{
          setError('Error al Eliminar Producto')
        }
      } catch (error) {
        setError('Error al Eliminar Producto')
      }
    }
  }

  return (
    <div className={styles.editModal}>
      <h1>{type === 'edit' ? 'Editar' : 'Agregar'} Producto</h1>
      <input type="text" placeholder='Producto' value={name} onChange={e=>setName(e.target.value)}/>
      <input type="number" placeholder='Precio' value={price} onChange={e=>setPrice(parseFloat(e.target.value))}/>
      <select value={category} onChange={e=>setCategory(e.target.value)} className={styles.selector}>
        <option value="">Categoria</option>
        <option value="V">Viveres</option>
        <option value="D">Dulces</option>
        <option value="L">Lacteos</option>
        <option value="AP">Aseo Personal</option>
        <option value="O">Otros</option>
      </select>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} >{type === 'edit' ? 'Editar' : 'Agregar'}</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalEdit;