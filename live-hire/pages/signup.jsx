import React, { useState } from 'react';
import { withPublic } from '../hook/route';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'


const Signup = ({ auth }) => {
    const { user, loginWithGoogle, loginWithEmailAndPassword, signupWithEmailAndPassword, error } = auth;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupUserWithEmailAndPassword = async () => {
        if(username === "" || email === "" || password === "") {
            alert("Please fill in all the fields");
            console.log("Error: ", error);
        } else {
            await signupWithEmailAndPassword(username, email, password);
        }
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
                            <h2 className="header-title">Welcome to Live Hire!</h2>
                            <h3 className="header-subtitle">
                            Welcome! please enter your details to create an account
                            </h3>
                            <button class="button" onClick={loginWithGoogle}>
                                <span class="icon">
                                    <FcGoogle />
                                </span>
                                <span>Signup with Google</span>
                            </button>
                            <div className="or">
                                <hr />
                                <p>or</p>
                                <hr />
                            </div>
                        </div>
                        <form className="form">
                            <div class="field">
                                <p class="control">
                                    <input class="input" type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <input class="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <input class="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <button class="button is-success" type="button" onClick={signupUserWithEmailAndPassword}>
                                        Signup
                                    </button>
                                </p>
                            </div>
                        </form>
                        <div className="signup">
                            <p>Already have an account?</p>
                            <Link href={'/login'}>
                                <a>Login to your account.</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right column"></div>
            </div>
        </div>
    )
};

export default withPublic(Signup);