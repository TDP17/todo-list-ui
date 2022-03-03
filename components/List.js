import { useEffect, useState } from 'react';

import NewTaskModal from './NewTaskModal';
import Tasks from './Tasks';
import ExpiredTasks from './ExpiredTasks';
import styles from '../styles/List.module.css';

const List = props => {
    const [modal, setModal] = useState(false);
    const [expired, setExpired] = useState(false);

    const [tasks, setTasks] = useState([]);

    const expiredTasks = tasks.filter(task => task.endTime < new Date().valueOf());
    const unexpiredTasks = tasks.filter(task => task.endTime >= new Date().valueOf());
    const highTasks = unexpiredTasks.filter(task => task.priority === 2);
    const mediumTasks = unexpiredTasks.filter(task => task.priority === 1);
    const lowTasks = unexpiredTasks.filter(task => task.priority === 0);

    useEffect(() => {
        const getInitialTasks = async () => {
            const initialTasksReq = await fetch(`https://to-do-list-oi.herokuapp.com/task/get`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            });
            const initialTasks = await initialTasksReq.json();
            setTasks(initialTasks);
        }
        getInitialTasks();
    }, []);

    return (
        <div className={styles.container}>
            <div className={modal ? styles.overlayOn : styles.overlayOff}>
                <NewTaskModal tasks={tasks} setTasks={setTasks} modal={modal} setModal={setModal} logout={props.logout} />
            </div>
            <div className={expired ? styles.overlayOn : styles.overlayOff}>
                <ExpiredTasks tasks={expiredTasks} setTasks={setTasks} expired={expired} setExpired={setExpired} logout={props.logout} />
            </div>
            <header className={styles.header}>
                <div className={styles.headerTab} style={{ backgroundColor: "#52BFBF" }}>
                    <div className={styles.logout} onClick={props.logout}>&#8592;</div>
                    &#9818; High Priority <p className={styles.count}>{highTasks.length}</p>
                </div>
                <div className={styles.headerTab} style={{ backgroundColor: "#8F7EE6" }}>
                    &#9819; Medium Priority <p className={styles.count}>{mediumTasks.length}</p>
                </div>
                <div className={styles.headerTab} style={{ backgroundColor: "#97AAB3" }}>
                    &#9820; Low Priority <p className={styles.count}>{lowTasks.length}</p>
                </div>
            </header>
            <Tasks highTasks={highTasks} mediumTasks={mediumTasks} lowTasks={lowTasks} setTasks={setTasks} logout={props.logout} />
            <section className={styles.utilityContainer}>
                <button className={styles.utilityButton} onClick={() => setModal(true)}>+</button>
                <button className={styles.utilityButton} onClick={() => setExpired(prev => !prev)}>!!</button>
            </section>
        </div>
    )
}

export default List;