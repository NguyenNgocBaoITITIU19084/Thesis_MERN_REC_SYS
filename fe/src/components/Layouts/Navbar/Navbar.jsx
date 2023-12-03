import React, { useState } from 'react'
import {BiMenuAltLeft, BiUserCircle} from 'react-icons/bi'
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai'
import {NavLink} from 'react-router-dom'

import styles from './Navbar.module.scss'
import DropDown from '../DropDown/DropDown'

const Navbar = () => {
    const [openDropdown, setOpenDropDown] = useState(false)
  return (
    <nav className={`${styles.container}`}>
        <div className={`${styles['categories-wrapper']}`}>
            <BiMenuAltLeft size={30}/>
            <span onClick={() => setOpenDropDown(!openDropdown)}>All Categogies</span>
            {
                openDropdown && <DropDown />
            }
        </div>
        <div className={`${styles['pages-wrapper']}`}>
            <ul className={`${styles['list-pages']}`}>
                <li>
                    <NavLink className={`${styles.page}`} to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink className={`${styles.page}`} to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink className={`${styles.page}`}to="/for-you">For you</NavLink>
                </li>
                <li>
                    <NavLink className={`${styles.page}`} to="/fag">FAQ</NavLink>
                </li>
            </ul>
        </div>
        <div className={`${styles['user-wrapper']}`}>
            <div className={`${styles['icons']}`}>
                <AiOutlineShoppingCart />
                <span>1</span>
            </div>
            <div className={`${styles['icons']}`}>
                <AiOutlineHeart />
                <span>1</span>
            </div>
            <div className={`${styles['icons']}`}>
                <BiUserCircle />
                <span>1</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar