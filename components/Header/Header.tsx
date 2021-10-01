import React from 'react';
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/logo.jpg'
import shoppingCartIcon from '../../public/images/shopping-cart.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} width={120} height={80} layout='responsive' className={styles.logo}/>
      </div>
      <Image src={shoppingCartIcon} width={40} height={40} className={styles.shoppingCartIcon}/>
    </header>
  );
}

export default Header;
