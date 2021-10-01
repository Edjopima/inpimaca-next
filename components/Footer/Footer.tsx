import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={`${styles.footer}`}>
      <p className="footer__text">Desarrollado por Eduardo Piña para INPIMACA, 2021</p>
    </div>
  );
}

export default Footer;