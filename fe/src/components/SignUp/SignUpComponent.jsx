import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import styles from './SignUpComponent.module.scss'
import {Link} from 'react-router-dom'
const SignUpComponent = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [conformVisible, setConformVisible] = useState(false)
  return (
    <div className={`${styles['login-wapper']}`}>
        <div className={`${styles['login-header']}`}>
            <h2>Register a New Account</h2>
        </div>
        <div className={`${styles['login-form']}`}>
                <div className={`${styles['input-element']}`}>
                    <label>Email Address</label>
                    <input type='email' required autoComplete='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className={`${styles['input-element']}`}>
                    <label>Password</label>
                    <input className={`${styles['password']}`} type={visible ? 'text' : 'password'} required autoComplete='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {
                        visible ? (
                            <AiOutlineEye className={`${styles['visible-button']}`} onClick={() => setVisible(false)}/>
                        ) : (
                            <AiOutlineEyeInvisible className={`${styles['visible-button']}`} onClick={() => setVisible(true)}/>
                        )
                    }
                </div>
                <div className={`${styles['input-element']}`}>
                    <label>Confirm Password</label>
                    <input className={`${styles['password']}`} type={conformVisible ? 'text' : 'password'} required autoComplete='password' name='password' value={conformPassword} onChange={(e) => setConformPassword(e.target.value)}></input>
                    {
                        conformVisible ? (
                            <AiOutlineEye className={`${styles['visible-button']}`} onClick={() => setConformVisible(false)}/>
                        ) : (
                            <AiOutlineEyeInvisible className={`${styles['visible-button']}`} onClick={() => setConformVisible(true)}/>
                        )
                    }
                </div>
        </div>
        <div className={`${styles['submit']}`}>
            <button>Submit</button>
            <p>Already Have an Account? <Link to="/login">Sign-In</Link></p>
        </div>
    </div>
  )
}

export default SignUpComponent