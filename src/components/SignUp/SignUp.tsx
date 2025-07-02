import React, { useRef } from 'react'
import './SignUp.css'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const register = (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => alert(error.message));
    };

    const signIn = (e: any) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then((authUser) => {
            console.log(authUser)
        }).catch((error) => alert(error.message))
    }
    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Email Address' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button onClick={signIn}>Sign In</button>

                <h4><span className='signUpScreen__gray'>New to Netflix? </span><span className='signUpScreen__link' onClick={register}>Sign Up Now.</span></h4>
            </form>
        </div>
    )
}

export default SignUp