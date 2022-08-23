import Link from 'next/link';
import React, { useState } from 'react';
import Header from '../components/header';
import { withPublic } from "../hook/route";
import { FcGoogle } from 'react-icons/fc'

const Login = ({ auth }) => {
    const { user, loginWithGoogle, loginWithEmailAndPassword, error } = auth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const loginUserWithEmailAndPassword = async () => {
        await loginWithEmailAndPassword(email, password);
    }

    return (
        <div className="login-page">
            <div className="login-container columns">
                <div className="left column is-7">
                    <div className="go-back">
                        <Link href={'/'}>
                            <a>Go back Home</a>
                        </Link>
                    </div>
                    <div className="main">
                        <div className="header">
                            <h2 className="header-title">Welcome back!</h2>
                            <h3 className="header-subtitle">
                                Welcome back, please enter your details
                            </h3>
                            <button className="button" onClick={loginWithGoogle}>
                                <span className="icon">
                                    <FcGoogle />
                                </span>
                                <span>Login with Google</span>
                            </button>
                            <div className="or">
                                <hr />
                                <p>or</p>
                                <hr />
                            </div>
                        </div>
                        <form className="form">
                            <div className="field">
                                <p className="control">
                                    <input className="input" type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} />            
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <button className="button is-success" type="button" onClick={loginUserWithEmailAndPassword}>
                                        Login
                                    </button>
                                </p>
                            </div>
                        </form>
                        <div className="signup">
                            <p>Dont have an account?</p>
                            <Link href={'/signup'}>
                                <a>Sign up for free</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right column"></div>
            </div>
        </div>
    )
}

export default withPublic(Login);