import React, { useState } from 'react'
import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";
import styles from '../styles/Modal.module.css';

const NewTaskModal = props => {
    const [newTaskLabel, setNewTaskLabel] = useState('');
    const [priority, setPriority] = useState(2); // 2 high, 1 medium, 0 low
    const [endTime, setEndTime] = useState(new Date());

    const handlePriority = (e) => {
        if (e.target.value === 'high')
            setPriority(2);
        else if (e.target.value === 'medium')
            setPriority(1);
        else if (e.target.value === 'low')
            setPriority(0);
    }

    const addTask = async (e) => {
        e.preventDefault();
        const data = { label: newTaskLabel, priority: priority, endTime: endTime.valueOf() };

        const response = await fetch(`https://to-do-list-oi.herokuapp.com/task/create`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const res = await response.json();
            data.id = res.id;
            props.setTasks([...props.tasks, data]);
            props.setModal(false);
        }
        if (response.status === 401)
            props.logout();

        setNewTaskLabel('');
    }

    const clearModal = () => {
        setNewTaskLabel('');
        setEndTime(new Date());
    }

    return (
        <>
            <form className={props.modal ? styles.taskFormOn : styles.taskFormOff} onSubmit={addTask}>
                <button className={styles.modalButton} onClick={() => props.setModal(false)}>&#10006;</button>
                <center style={{ marginBottom: "1rem" }}><h3>New Task Modal</h3></center>
                <hr />
                <section>
                    <label>Task Label</label>
                    <input type="text" onChange={(e) => setNewTaskLabel(e.target.value)} value={newTaskLabel} />
                </section>
                <section>
                    <label>Priority</label>
                    <select name="cars" id="cars" form="carform" onChange={handlePriority}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </section>
                <section>
                    <label>Expires At</label>
                    <Datetime onChange={newVal => setEndTime(newVal)} initialValue={endTime} value={endTime} minDate={new Date()} />
                </section>
                <section>
                    <button style={{ backgroundColor: "#337AB7" }} className={styles.modalEndButton} onClick={clearModal}>Clear</button>
                    <button style={{ backgroundColor: "#5CB85C" }} className={styles.modalEndButton} type="submit">Confirm</button>
                </section>
            </form>
        </>
    )
}

export default NewTaskModal