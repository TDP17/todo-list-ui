import React from 'react'
import Task from './Task'

import styles from '../styles/ExpiredTasks.module.css'

const ExpiredTasks = props => {
    return (
        <div className={props.expired ? styles.expiredContainerOn : styles.expiredContainerOff}>
            {props.tasks.length === 0 ? "No tasks expired" :
                props.tasks.map(task =>
                    <Task label={task.label} id={task.id} setTasks={props.setTasks} endTime={task.endTime} key={task.id} logout={props.logout} expired={true} />
                )
            }
        </div>
    )
}

export default ExpiredTasks