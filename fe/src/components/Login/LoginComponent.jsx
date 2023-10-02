import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import styles from './LoginComponent.module.scss'

const LoginComponent = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
  return (
    <div className={`${styles['login-wapper']}`}>
        <div className={`${styles['login-header']}`}>
            <h2>Login To Your Account</h2>
        </div>
        <div className={`${styles['login-form']}`}>
                <div className={`${styles['input-element']}`}>
                    <label>Email Address</label>
                    <input type='email' required autoComplete='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className={`${styles['input-element']}`}>
                    <label>Password</label>
                    <input className={`${styles['password']}`} type='password' required autoComplete='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {
                        visible ? (
                            <AiOutlineEye className={`${styles['visible-button']}`} onClick={() => setVisible(false)}/>
                        ) : (
                            <AiOutlineEyeInvisible className={`${styles['visible-button']}`} onClick={() => setVisible(true)}/>
                        )
                    }
                </div>
        </div>
        <div className={`${styles['login-option']}`}>
            <div>
                <input type='checkbox'/>
                <label>Remember Me</label>
            </div>
            <div>
                    <a href='12323'>Forgot password?</a>
            </div>
        </div>
        <div className={`${styles['submit']}`}>
            <button>Submit</button>
            <p>Not have an account? <a href='signup'>Sign Up Now</a></p>
            
        </div>
    </div>
  )
}

export default LoginComponent