import React from 'react';
import { ProductType } from '../../context/context';
import styles from './Modal.module.css';
import ModalEdit from './ModalEdit';

type Props = {
  show: boolean;
  onClose?: () => void;
  product: ProductType;
  type:string;
}

const Modal: React.FC<Props> = ({show,product,type,onClose}) => {
  console.log(product,type);
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
      </div>
    </div>)
  );
}

export default Modal;