import React, { useState } from 'react';
import styles from '../styles/Tasks.module.css';

const Task = props => {
  const [taskLabel, setTaskLabel] = useState(props.label);
  const [editMode, setEditMode] = useState(false);

  const deleteTask = async () => {
    const response = await fetch(`https://to-do-list-oi.herokuapp.com/task/delete/${props.id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });
    if (response.ok) {
      props.setTasks((tasks) => {
        return tasks.filter(task => task.id !== props.id)
      })
    }
    if (response.status === 401)
      props.logout();
  }

  const editTask = async () => {
    if (editMode) {
      const data = { label: taskLabel };
      const response = await fetch(`https://to-do-list-oi.herokuapp.com/task/edit/${props.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        props.setTasks((tasks) => {
          const newTasks = [...tasks];
          const taskID = tasks.findIndex(task => task.id === props.id);
          newTasks[taskID].label = taskLabel;
          return newTasks;
        })
      }
      if (response.status === 401)
        props.logout();
    }
    setEditMode(p => !p);
  }

  const changeLabel = (e) => {
    setTaskLabel(e.target.value)
  }

  const dateFunction = (ms) => {
    const date = new Date(+ms);
    return date.toLocaleString();
  }

  return (
    <div className={styles.taskContainer} style={{ backgroundColor: `${props.expired ? "#6C757D" : "white"}`, color: `${props.expired ? "white" : "black"}` }}>
      <section>
        {editMode ? <textarea type="text" value={taskLabel} onChange={changeLabel}></textarea> : props.label}
        <br />
        <small style={{ color: `${props.expired ? "white" : "gray"}`, fontSize: "0.6rem" }}> {dateFunction(props.endTime)}</small>
      </section>
      <div className={styles.taskButtonContainer}>
        <button style={{ color: `${props.expired ? "white" : "red"}` }} className={styles.taskButton} onClick={deleteTask}>&#128711;</button>
        <button style={{ color: `${props.expired ? "white" : "blue"}` }} className={styles.taskButton} onClick={editTask}>{editMode ? <>&#10003;</> : <>&#128394;</>}</button>
      </div>
    </div>
  );
};

export default Task;
