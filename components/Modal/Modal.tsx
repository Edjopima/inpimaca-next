import React from 'react';
import { ProductType } from '../../context/context';
import styles from './Modal.module.css';
import ModalAddToCart from './ModalAddToCart';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

type Props = {
  show: boolean;
  onClose?: () => void;
  product: ProductType;
  type:string;
}

const Modal: React.FC<Props> = ({show,product,type,onClose}) => {
  return (
    show && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {(type === 'add' || type==='edit') && (
          <ModalEdit 
            product={product}
            type={type}
            onClose={onClose}
          />
        )}
        {type === 'remove' && 
        <ModalDelete
          product={product}
          onClose={onClose}
        />}
        {type==='addToCart' && 
        <ModalAddToCart
          product={product}
          onClose={onClose}
        />}
      </div>
    </div>)
  );
}

export default Modal;