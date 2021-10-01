import React,{useContext} from 'react';
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/logo.jpg'
import ShoppingCartIcon from '../../public/images/shopping-cart.svg'
import { Context } from '../../context/context';

const Header = () => {
  const  {state:{shoppingCart}} = useContext(Context);

  return (
    <header className={styles.header}>
      <div className={styles.separator}></div>
      <div className={styles.logo}>
        <Image src={Logo} width={120} height={80} layout='responsive' className={styles.logo}/>
      </div>
      <Link href='/shoppingCart'>
        <div className={styles.shoppingCart}>
          <ShoppingCartIcon width={40} height={40} className={styles.shoppingCartIcon}/>
          <p>Carrito ({shoppingCart.length})</p>
        </div>
      </Link>
    </header>
  );
}

export default Header;
