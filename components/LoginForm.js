import Router from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

const LoginForm = props => {
    const [showPassword, setShowPassword] = useState(false);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { username: loginUsername, password: loginPassword };

        const response = await fetch('process.env.API_URLauth/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok)
            props.setUserLoggedIn(true);
        else if (response.status !== 503) {
            props.setWarning("Invalid credentials")
        }
        else if (response.status === 503) {
            props.setWarning("Internal server issues, please try again later")
        }
    };

    return (
        <form className={styles.homeForm} onSubmit={handleLogin}>
            <label htmlFor="lusername">Username</label>
            <section className={styles.homeFormInput}>
                <input type="text" name="lusername" id="lusername" onChange={(e) => setLoginUsername(e.target.value)} />
            </section>
            <label htmlFor="lpassword">Password</label>
            <section className={styles.homeFormInput}>
                <input type={`${showPassword ? 'text' : 'password'}`} name="lpassword" id="lpassword" onChange={(e) => setLoginPassword(e.target.value)} />
                <span onClick={() => setShowPassword(p => !p)}>&#x1F441;</span>
            </section>
            <button className={styles.homeFormButton}>LOGIN</button>
        </form>
    );
};

export default LoginForm;
