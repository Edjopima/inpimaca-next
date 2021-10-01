import React from 'react';
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/logo.jpg'
import ShoppingCartIcon from '../../public/images/shopping-cart.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <div></div>
      <div className={styles.logo}>
        <Image src={Logo} width={120} height={80} layout='responsive' className={styles.logo}/>
      </div>
      <Link href='/shoppingCart'>
        <div className={styles.shoppingCart}>
          <ShoppingCartIcon width={40} height={40} className={styles.shoppingCartIcon}/>
          <p>Carrito (0)</p>
        </div>
      </Link>
    </header>
  );
}

export default Header;
