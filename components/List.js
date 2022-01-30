import { useEffect, useState } from 'react';
import Tasks from './Tasks';

import styles from '../styles/List.module.css';

const List = props => {
    const [newTaskLabel, setNewTaskLabel] = useState('');
    const [priority, setPriority] = useState(2); // 2 high, 1 medium, 0 low

    const [tasks, setTasks] = useState([]);

    let highTasks = tasks.filter(task => task.priority === 2);
    let mediumTasks = tasks.filter(task => task.priority === 1);
    let lowTasks = tasks.filter(task => task.priority === 0);

    useEffect(() => {
        const getInitialTasks = async () => {
            const initialTasksReq = await fetch('process.env.API_URLtask/get', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            });
            const initialTasks = await initialTasksReq.json();
            setTasks(initialTasks);
        }
        getInitialTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();

        const data = { label: newTaskLabel, priority: priority };

        const response = await fetch('process.env.API_URLtask/create', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok)
            setTasks([...tasks, data]);
        if (response.status === 401)
            props.logout();

        setNewTaskLabel('');
    }

    const handleDescription = (e) => {
        setNewTaskLabel(e.target.value);
    }

    const handlePriority = (e) => {
        if (e.target.value === 'high')
            setPriority(2);
        else if (e.target.value === 'medium')
            setPriority(1);
        else if (e.target.value === 'low')
            setPriority(0);
    }

    return (
        <div className={styles.container}>
            <form className={styles.taskForm} onSubmit={addTask}>
                <input type="text" placeholder="Enter task label here" onChange={handleDescription} value={newTaskLabel} />
                <select name="cars" id="cars" form="carform" onChange={handlePriority}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit">&#8702;</button>
            </form>
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
        </div>
    )
}

export default List;