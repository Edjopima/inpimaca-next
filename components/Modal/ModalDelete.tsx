import React,{useState} from 'react';
import { ProductType } from '../../context/context';
import styles from './Modal.module.css';

type Props = {
  onClose: () => void;
  product: ProductType
}

const ModalDelete: React.FC<Props> = ({onClose, product}) => {
  const [error, setError] = useState('');
  
  const handleSubmit = async () =>{
    const url = 'https://inpimaca-api.herokuapp.com/eliminarProducto';
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      if(data.error){
        setError(data.error);
      }else{
        onClose();
      }
    }catch(err){
      setError(err.message);
    }
  }

  return (
    <div className={styles.editModal}>
      <h1>Eliminar Producto</h1>
      {error && <p className={styles.error}>{error}</p>}
      <p>¿Está seguro que desea eliminar este producto?</p>
      <p>{product.product}</p>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} >Eliminar</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalDelete;