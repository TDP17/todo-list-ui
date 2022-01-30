import React, { useEffect, useState } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from '../styles/Home.module.css';

const Home = props => {
    const [tab, setTab] = useState(false); // f => sign in, t => register

    useEffect(() => {
        props.setWarning('');
    }, [tab]);
    

    return (
        <div className={styles.container}>
            <div className={styles.homeFormContainer}>

                <section className={styles.homeFormHeader}>
                    <div className={`${!tab ? styles.headerTabActive : styles.headerTabInactive} ${styles.headerTab}`} onClick={() => setTab(false)}>
                        SIGN IN
                    </div>
                    <div className={`${tab ? styles.headerTabActive : styles.headerTabInactive} ${styles.headerTab}`} onClick={() => setTab(true)}>
                        REGISTER
                    </div>
                </section>

                <section className={styles.formOutput}>{props.warning.length !== 0 && props.warning}</section>

                {!tab ? <LoginForm setUserLoggedIn={props.setUserLoggedIn} setWarning={props.setWarning} /> : <RegisterForm setUserLoggedIn={props.setUserLoggedIn} setWarning={props.setWarning} />}

            </div>
        </div>
    );
};

export default Home;
