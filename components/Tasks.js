import React from 'react';
import Task from './Task';

import styles from '../styles/Tasks.module.css';

const Tasks = props => {
    return (
        <section className={styles.tasksContainer}>
            <div className={styles.taskTab}>
                {props.highTasks.map(task =>
                    <Task label={task.label} id={task.id} setTasks={props.setTasks} endTime={task.endTime} key={task.id} logout={props.logout} />
                )}
            </div>
            <div className={styles.taskTab}>
                {props.mediumTasks.map(task =>
                    <Task label={task.label} id={task.id} setTasks={props.setTasks} endTime={task.endTime} key={task.id} logout={props.logout} />
                )}
            </div>
            <div className={styles.taskTab}>
                {props.lowTasks.map(task =>
                    <Task label={task.label} id={task.id} setTasks={props.setTasks} endTime={task.endTime} key={task.id} logout={props.logout} />
                )}
            </div>
        </section>
    );
};

export default Tasks;
