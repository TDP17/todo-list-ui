import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

const RegisterForm = props => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

    const [registerUsernameTouched, setRegisterUsernameTouched] = useState(false);
    const [registerPasswordTouched, setRegisterPasswordTouched] = useState(false);
    const [registerConfirmPasswordTouched, setRegisterConfirmPasswordTouched] = useState(false);

    const registerUsernameValid = registerUsername.trim().length >= 3 && registerUsername.trim().length <= 20;
    const registerPasswordValid = registerPassword.trim().length >= 8;
    const registerConfirmPasswordValid = registerConfirmPassword.trim() === registerPassword.trim();

    const registerUsernameInvalid = !registerUsernameValid && registerUsernameTouched;
    const registerPasswordInvalid = !registerPasswordValid && registerPasswordTouched;
    const registerConfirmPasswordInvalid = !registerConfirmPasswordValid && registerConfirmPasswordTouched;

    let formIsValid = false;
    if (registerUsernameValid && registerPasswordValid && registerConfirmPasswordValid)
        formIsValid = true;

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { username: registerUsername, password: registerPassword, confirmPassword: registerConfirmPassword };

        const response = await fetch(`https://to-do-list-oi.herokuapp.com/auth/register`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            setRegisterUsername('');
            setRegisterPassword('');
            setRegisterConfirmPassword('');
            setRegisterUsernameTouched(false);
            setRegisterPasswordTouched(false);
            setRegisterConfirmPasswordTouched(false);
            props.setWarning('User created, please log in');
        }
        else if (response.status === 409) {
            props.setWarning("User already exists")
        }
        else if (response.status === 503) {
            props.setWarning("Internal server issues, please try again later")
        }
    };

    return (
        <form className={styles.homeForm} onSubmit={handleRegister}>
            <label htmlFor="rusername">Username * <span className={styles.tooltip}>&#9432;<sup className={styles.tooltipText}> Username must be 3-20 characters long</sup></span></label>
            <section className={styles.homeFormInput}>
                <input type="text" name="rusername" id="rusername" onChange={(e) => setRegisterUsername(e.target.value)} onBlur={() => setRegisterUsernameTouched(true)} className={registerUsernameInvalid ? styles.invalid : ''} value={registerUsername} />
            </section>
            <label htmlFor="rpassword">Password * <span className={styles.tooltip}>&#9432;<sup className={styles.tooltipText}> Password must be atleast 8 characters long</sup></span></label>
            <section className={styles.homeFormInput}>
                <input type={`${showPassword ? 'text' : 'password'}`} name="rpassword" id="rpassword" onChange={(e) => setRegisterPassword(e.target.value)} onBlur={() => setRegisterPasswordTouched(true)} className={registerPasswordInvalid ? styles.invalid : ''} value={registerPassword} />
                <span onClick={() => setShowPassword(p => !p)}>&#128065;</span>
            </section>
            <label htmlFor="confirmPassword">Confirm Password * <span className={styles.tooltip}>&#9432;<sup className={styles.tooltipText}> Passwords must match</sup></span></label>
            <section className={styles.homeFormInput}>
                <input type={`${showConfirmPassword ? 'text' : 'password'}`} name="confirmPassword" id="confirmPassword" onChange={(e) => setRegisterConfirmPassword(e.target.value)} onBlur={() => setRegisterConfirmPasswordTouched(true)} className={registerConfirmPasswordInvalid ? styles.invalid : ''} value={registerConfirmPassword} />
                <span onClick={() => setShowConfirmPassword(p => !p)}>&#x1F441;</span>
            </section>
            <button disabled={!formIsValid} className={`${styles.homeFormButton} ${!formIsValid ? styles.disabled : ''}`}>REGISTER</button>

        </form >
    );
};

export default RegisterForm;
