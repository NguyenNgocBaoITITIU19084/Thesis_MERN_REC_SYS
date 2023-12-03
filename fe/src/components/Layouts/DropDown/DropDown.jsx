import React from 'react'
import {Link} from 'react-router-dom'

import styles from './DropDown.module.scss'

const DropDown = () => {
  return (
    <div className={`${styles.container}`}>
        <Link className={`${styles.item}`}>
            <span>
                example title
            </span>
        </Link>
        <Link className={`${styles.item}`}>
            <span>
                example title
            </span>
        </Link>
        <Link className={`${styles.item}`}>
            <span>
                example title
            </span>
        </Link>
        <Link className={`${styles.item}`}>
            <span>
                example title
            </span>
        </Link>
    </div>
  )
}

export default DropDown