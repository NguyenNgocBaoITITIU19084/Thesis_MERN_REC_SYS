import React from 'react'
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import {BiMenuAltLeft} from 'react-icons/bi'
import { Link} from 'react-router-dom'

import styles from './Header.module.scss'
const Header = () => {
  return (
    <div className={`${styles['header-container']}`}>
      <div className={`${styles['first-header']}`}>
        <div className={`${styles['logo-wrapper']}`}>
          <Link to="/home" className={`${styles.logo}`}>
            <span>ShopDev.</span>
          </Link>
        </div>
        <div className={`${styles['search-wrapper']}`}>
          <input type='text' placeholder='Search product...' name='search-box'className='search-box'/>
          <div className={`${styles['button']}`}>
            <AiOutlineSearch />
          </div>
        </div>
        <div className={`${styles['option-wrapper']}`}>
          <div className={`${styles.option}`}>
            <span>Become Supplier </span>
          </div>
        </div>
      </div>
      <div className={`${styles['second-header']}`}>
         
      </div>
    </div>
  )
}

export default Header