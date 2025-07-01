import React, { useState } from 'react'
import NetflixLogo from '../../assets/NetflixLogo.png'
import './Login.css'
import SignUp from '../SignUp/SIgnUp';


const Login = () => {

    const [signIn, setSignIn] = useState(false);

    return (
        <div className='loginScreen'>
            <div className="loginScreen__background">
                <img src={NetflixLogo} alt="image" className="loginScreen__logo" />
                <button className='loginScreen__button' onClick={() => setSignIn(true)}>Sign In</button>
                <div className="loginScreen__gradient"></div>
            </div>
            <div className="loginScreen__body">
                {signIn ? <SignUp /> : <>
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h2>Starts at ₹149. Cancel at any time.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className="loginScreen__input">
                        <form>
                            <input type='email' placeholder='Email Address' />
                            <button className='loginScreen__getStarted' onClick={() => setSignIn(true)}>GET STARTED</button>
                        </form>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Login